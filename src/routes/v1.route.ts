import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { isLoggedIn } from '../middlewares/login.middleware';
import v1Controller from '@/controllers/v1.controller';

class v1Route implements Routes {
  public path = '/v1';
  public router = Router();
  public v1Controller = new v1Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/token`, this.v1Controller.makeToken);
    this.router.get(`${this.path}/test`, isLoggedIn);
    this.router.get(`${this.path}/posts/my`, this.v1Controller.getMyPosts);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default v1Route;
