import passport from 'passport';

import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { Users } from '@entities/Users';

const local = () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done) => {
        try {
          const exUser = await Users.findOne({ where: { email } });
          if (exUser) {
            const passwordMatch = await bcrypt.compare(password, exUser.password);
            if (passwordMatch) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export default local;
