import { EntityRepository, Repository } from 'typeorm';
import { Domains } from '../entities/Domain';
import { Posts } from '../entities/Posts';

@EntityRepository()
class v1Service {
  public async findDomainByKey(clientSecret: string): Promise<Domains> {
    return await Domains.createQueryBuilder('Domains')
      .leftJoinAndSelect('Domains.user', 'user')
      .where('Domains.clientSecret = :clientSecret', { clientSecret })
      .getOne();
  }
  public async findMyPost(userId: number): Promise<Posts[]> {
    return await Posts.find({ where: { userId } });
  }
}

export default v1Service;
