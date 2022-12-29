import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { Users } from '../entities/Users';
import { RequestWithUser } from '../interfaces/auth.interface';
import { Domains } from '@/entities/Domain';

@EntityRepository()
class IndexService extends Repository<Users> {
  public index = async (req: RequestWithUser): Promise<Users> => {
    const user: Users = await Users.createQueryBuilder('Users')
      .leftJoinAndSelect('Users.domains', 'domains')
      .where('Users.id = :id', { id: (req.user && req.user.id) || null })
      .getOne();
    return user;
  };
}

export default IndexService;
