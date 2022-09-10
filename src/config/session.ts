import session from 'express-session';

import connectRedis from 'connect-redis';
import {createClient} from 'redis';
import {Application} from 'express';

export const prepareSeesion = async (app: Application) => {
  //Redis congurations
  const redisClient = createClient({legacyMode: true});
  redisClient.connect().catch(console.error);
  const RedisStore = connectRedis(session);

  //Configure session middleware
  const SESSION_SECRET = `${process.env.SESSION_SECRET}`;

  app.use(
    session({
      store: new RedisStore({client: redisClient}),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10, // session max age in miliseconds
      },
    })
  );
};

export default prepareSeesion;
