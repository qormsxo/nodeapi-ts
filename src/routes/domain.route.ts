import { Request, Response, Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
// import authMiddleware from '@middlewares/auth.middleware';
import { isNotLoggedIn, isLoggedIn } from '../middlewares/login.middleware';
import passport from 'passport';
import DomainController from '@/controllers/domain.controller';

class DomainRoute implements Routes {
  public path = '/domain';
  public router = Router();
  public domainController = new DomainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.domainController.domainCreate);
  }
}

export default DomainRoute;
