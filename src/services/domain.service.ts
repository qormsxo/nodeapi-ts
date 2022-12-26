import { EntityRepository, Repository } from 'typeorm';
import { Domains } from '../entities/Domain';

@EntityRepository()
class DomainService extends Repository<Domains> {}

export default DomainService;
