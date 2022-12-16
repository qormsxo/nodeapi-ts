import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { isLoggedIn } from '../middlewares/login.middleware';

class UsersRoute implements Routes {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, isLoggedIn, this.usersController.profileView);
    this.router.post(`${this.path}/:id/follow`, isLoggedIn, this.usersController.addFollowing);
    this.router.delete(`${this.path}/:id/follow`, isLoggedIn, this.usersController.deleteFollowing);

    this.router.patch(`${this.path}`, isLoggedIn, this.usersController.updateUser);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
