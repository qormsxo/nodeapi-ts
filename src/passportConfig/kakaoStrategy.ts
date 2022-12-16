import passport from 'passport';

import { Strategy } from 'passport-kakao';

import { Users } from '@entities/Users';

const kakao = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await Users.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await Users.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            }).save();
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export default kakao;
