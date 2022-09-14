import {Application} from 'express';
import passport from 'passport';
import {Strategy} from 'passport-local';
import bcrypt from 'bcrypt';
import User, {ExpressUser} from '../models/database/userDTO';

export const preparePasspostConfig = async (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    'local',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const user = (await User.findOne({where: {email: email}})) as User;
        if (!user) {
          return done(null, false, {message: 'Invalid credentials.\n'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: 'Invalid credentials.\n'});
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser<number>((user: ExpressUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    const user = await User.findByPk(id);
    if (!user) {
      done(Error, false);
    }
    done(null, user);
  });
};

export default preparePasspostConfig;
