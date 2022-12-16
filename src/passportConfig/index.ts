import passport from 'passport';
import local from '@/passportConfig/localStrategy';
import { Users } from '../entities/Users';
import { Follow } from '../entities/Follow';
import kakao from './kakaoStrategy';
export default () => {
  passport.serializeUser((user: Users, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    // 서브쿼리 할려고했는데 실패함 나중에 다시 찾아봄
    const follower = await Users.createQueryBuilder('follower') // 로그인한 유저 기준 나를  팔로우 한사람
      .innerJoin(Follow, 'follow', 'follower.id = follow.followerId ')
      .select(['follower.id', 'follower.nick'])
      .where('follow.followingId= :id', { id })
      // .andWhere('follower.id = follow.followingId')
      .getMany();

    const following = await Users.createQueryBuilder('following') // 로그인한 유저 기준 내가 팔로우한 사람
      .innerJoin(Follow, 'follow', 'following.id = follow.followingId ')
      .select(['following.id', 'following.nick'])
      .where('follow.followerId= :id', { id })
      // .andWhere('following.id = follow.followerId')
      .getMany();

    Users.createQueryBuilder('users')
      .where('users.id= :id', { id })
      .getOne()
      .then(user => {
        user.Followers = follower;
        user.Followings = following;
        done(null, user);
      })
      .catch(err => done(err));
  });

  local();
  kakao();
};
