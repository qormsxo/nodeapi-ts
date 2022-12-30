import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../interfaces/auth.interface';
import { Response, NextFunction } from 'express';

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    req['decoded'] = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // JWT_SECRET ENV에 넣어야함
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};
