import { EntityRepository, Repository } from 'typeorm';
import { Domains } from '../entities/Domain';

@EntityRepository()
class v1Service {
  public async findDomainByKey(clientSecret: string): Promise<Domains> {
    return await Domains.createQueryBuilder('Domains')
      .leftJoinAndSelect('Domains.user', 'user')
      .where('Domains.clientSecret = :clientSecret', { clientSecret })
      .getOne();
  }
}

export default v1Service;
