import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('login');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
