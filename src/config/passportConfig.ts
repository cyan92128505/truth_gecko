import {Application} from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
// import {Strategy as FacebookStrategy} from 'passport-facebook';
import bcrypt from 'bcrypt';
import User, {ExpressUser} from '../models/database/userDTO';
import {DataSource} from 'typeorm';

export const preparePasspostConfig = async (
  app: Application,
  database: DataSource
) => {
  const userRepository = await User(database);

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

  // passport.use(
  //   'facebook',
  //   new FacebookStrategy(
  //     {
  //       clientID: process.env.FACEBOOK_CLIENT_ID,
  //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //       callbackURL: 'api/v1/oauth2/redirect/facebook',
  //     },
  //     (accessToken, refreshToken, profile, cb) => {}
  //   )
  // );

  passport.serializeUser<number>((user: ExpressUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    const user = await userRepository.findOneBy({id: id});
    if (!user) {
      done(Error, false);
    }
    done(null, user);
  });
};

export default preparePasspostConfig;
