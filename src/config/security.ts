import {Application, Request} from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';

import bcrypt from 'bcrypt';
import {ExpressUser, UserRepository} from '../modules/user/models/users';

const secret = process.env.JWT_SECRET;

const cookieRefreshExtractor = (req: Request, key?: string): string => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies[key || 'refresh'];
  }

  return jwt;
};

export const Security = async (app: Application) => {
  const userRepository = await UserRepository();

  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
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

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwt_payload, done) => {
        done(null, jwt_payload);
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

  app.use(passport.initialize());
};

export default Security;
