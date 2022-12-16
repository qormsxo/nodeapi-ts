import { EntityRepository, Repository } from 'typeorm';
import { Users } from '@entities/Users';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Follow } from '../entities/Follow';

@EntityRepository()
class UserService extends Repository<Users> {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await Users.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await Users.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async following(userId: number, followerId: number): Promise<void> {
    // followerId : (팔로우 당하는 사람 기준) 팔로우를 건 사람.
    // followingId : (팔로우 한사람 기준) 팔로우 건 상대 (현재 로그인한 유저)
    Follow.create({ followerId: userId, followingId: followerId }).save();
  }

  public async deleteFollowing(userId: number, followingUserId: number): Promise<void> {
    Follow.delete({ followerId: userId, followingId: followingUserId });
  }

  public async updateUser(userId: number, newNick: string): Promise<void> {
    console.log('?????????????????????????????????????????????????????');
    Users.update({ id: userId }, { nick: newNick });
  }

  // public async deleteUser(userId: number): Promise<User> {
  //   if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

  //   const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   await UserEntity.delete({ id: userId });
  //   return findUser;
  // }
}

export default UserService;
