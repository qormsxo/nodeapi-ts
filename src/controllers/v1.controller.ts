import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import v1Service from '@services/v1.service';
import * as jwt from 'jsonwebtoken';
import { Domains } from '../entities/Domain';

class v1Controller {
  public v1Service = new v1Service();

  public makeToken = async (req: RequestWithUser, res: Response) => {
    const { clientSecret } = req.body;
    console.log(clientSecret);
    const result = await this.makeTokenByClientSecret(clientSecret);
    res.status(result.code).json(result);
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: '서버 에러',
      });
    }
  };

  private makeTokenByClientSecret = async (clientSecret: string) => {
    const domain: Domains = await this.v1Service.findDomainByKey(clientSecret);
    console.log(domain);
    if (!domain) return { code: 401, message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요' };

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
    return { code: 200, message: '토큰이 발급되었습니다', token };
  };

  public getMyPosts = async (req: RequestWithUser, res: Response) => {
    await this.v1Service
      .findMyPost(req['decoded'].id) // 여기 어떻게 해야할지 방법 찾기
      .then(post => {
        res.json({
          code: 200,
          payload: post,
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          code: 500,
          message: '서버에러',
        });
      });
  };
}

export default v1Controller;
