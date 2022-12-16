import { Request, Response, Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@middlewares/auth.middleware';
import { isNotLoggedIn, isLoggedIn } from '../middlewares/login.middleware';
import passport from 'passport';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/join`, isNotLoggedIn, this.authController.joinView);
    this.router.post(`${this.path}/join`, isNotLoggedIn, this.authController.signUp);
    this.router.post(`${this.path}/login`, isNotLoggedIn, this.authController.logIn);
    this.router.get(`${this.path}/kakao`, passport.authenticate('kakao'));
    this.router.get(
      `${this.path}/kakao/callback`,
      passport.authenticate('kakao', {
        failureRedirect: '/',
      }),
      (req: Request, res: Response) => {
        res.redirect('/');
      },
    );
    this.router.get(`${this.path}/logout`, isLoggedIn, this.authController.logOut);
  }
}

export default AuthRoute;
