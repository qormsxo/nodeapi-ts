import { EntityRepository, Repository } from 'typeorm';
import { Domains } from '@entities/Domain';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository()
class DomainService extends Repository<Domains> {
  public async domainCreate(id: number, host: string, type: DomainsType): Promise<Domains> {
    return await Domains.create({ userId: id, host, type, clientSecret: uuidv4() }).save();
  }
}

export default DomainService;
