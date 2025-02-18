import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, COOKIE_SECRET } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import session from 'express-session';
import nunjucks from 'nunjucks';
import path from 'path';
import passport from 'passport';
import PassportConfig from '@/passportConfig';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    PassportConfig();
    this.app.set('view engine', 'html');
    nunjucks.configure('views', {
      express: this.app,
      watch: true,
    });
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser(COOKIE_SECRET));
    this.app.use(function (req, res, next) {
      res.setHeader('Content-Security-Policy', "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");
      next();
    });
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          secure: false,
        },
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    process.on('uncaughtException', function (err) {
      console.error('uncaughtException (Node is alive)', err);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
