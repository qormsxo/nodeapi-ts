import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import passport from 'passport';
import { RequestWithUser } from '@/interfaces/auth.interface';
import DomainService from '../services/domain.service';

class DomainController {
  private domainService = new DomainService();

  public domainCreate(req: RequestWithUser, res: Response, next: NextFunction) {
    const createDomain = this.domainService.domainCreate(req.user.id, req.body.host, req.body.type);
    console.log(createDomain);
    res.redirect('/');
  }
}

export default DomainController;
