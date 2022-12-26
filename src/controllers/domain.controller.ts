import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import passport from 'passport';
import { RequestWithUser } from '@/interfaces/auth.interface';
import DomainService from '../services/domain.service';

class DomainController {
  public domainService = new DomainService();
}

export default DomainController;
