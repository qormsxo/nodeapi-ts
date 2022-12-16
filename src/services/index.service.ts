import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/Users';

@EntityRepository()
class IndexService extends Repository<Users> {}

export default IndexService;
