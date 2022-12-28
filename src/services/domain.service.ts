import { EntityRepository, Repository } from 'typeorm';
import { Domains } from '@entities/Domain';

@EntityRepository()
class DomainService extends Repository<Domains> {
  public async domainCreate(id: number, host: string, type: DomainsType): Promise<Domains> {
    return await Domains.create({ userId: id, host, type }).save();
  }
}

export default DomainService;
