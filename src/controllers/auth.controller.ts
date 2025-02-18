import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import passport from 'passport';
import { RequestWithUser } from '@/interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public logIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (error: Error, user, info) => {
      if (error) {
        console.error(error);
        return next(error);
      }
      if (!user) {
        console.log(info.message);
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.logOut(err => {
      if (err) return next(err);
      req.destroy();
      res.redirect('/');
      // req.session.destroy(() => {
      //   res.redirect('/');
      // });
    });
  };
}

export default AuthController;
