import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import v1Service from '../services/v1.service';
import * as jwt from 'jsonwebtoken';

class v1Controller {
  public v1Service = new v1Service();

  public async makeToken(req: RequestWithUser, res: Response) {
    const { clientSecret } = req.body;
    console.log(clientSecret);
    try {
      const domain = await this.v1Service.findDomainByKey(clientSecret);
      if (!domain) {
        return res.status(401).json({
          code: 401,
          message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
        });
      }
      const token = jwt.sign(
        {
          id: domain.user.id,
          nick: domain.user.nick,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1m',
          issuer: 'node-sns',
        },
      );
      return res.json({
        code: 200,
        message: '토큰이 발급되었습니다',
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: '서버 에러',
      });
    }
  }
}

export default v1Controller;
