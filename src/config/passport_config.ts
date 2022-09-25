import {Application} from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
// import {Strategy as FacebookStrategy} from 'passport-facebook';
import bcrypt from 'bcrypt';
import {ExpressUser, UserRepository} from '../models';

export const preparePasspostConfig = async (app: Application) => {
  const userRepository = await UserRepository();

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const user = await userRepository.findOne({where: {email: email}});
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

  passport.serializeUser<string>((user: ExpressUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<string>(async (id, done) => {
    const user = await userRepository.findOneBy({id: id});
    if (!user) {
      done(Error, false);
    }
    done(null, user);
  });
};

export default preparePasspostConfig;
