import { RequestWithUser } from '../interfaces/auth.interface';
import { Response, NextFunction } from 'express';

export const isLoggedIn = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

export const isNotLoggedIn = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
