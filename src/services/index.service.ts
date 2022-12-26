import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { RequestWithUser } from '../interfaces/auth.interface';

@EntityRepository()
class IndexService extends Repository<Users> {
  public index = async (req: RequestWithUser): Promise<Users> => {
    return Users.findOne({
      where: { id: (req.user && req.user.id) || null },
    });
  };
}

export default IndexService;
