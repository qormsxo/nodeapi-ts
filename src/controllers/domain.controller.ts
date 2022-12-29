import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import DomainService from '@services/domain.service';

class DomainController {
  public domainService = new DomainService();

  public domainCreate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const createDomain = await this.domainService.domainCreate(req.user.id, req.body.host, req.body.type);
    console.log(createDomain);
    res.redirect('/');
  };
}

export default DomainController;
