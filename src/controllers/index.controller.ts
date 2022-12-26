import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../entities/Users';
import IndexService from '../services/index.service';

class IndexController {
  private indexService = new IndexService();

  public index = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.indexService.index(req);
      res.render('login');
    } catch (error) {
      next(error);
    }
  };

  public middleware(req: RequestWithUser, res: Response, next: NextFunction) {
    res.locals.user = req.user;
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
  }
}

export default IndexController;
