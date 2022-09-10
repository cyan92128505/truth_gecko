import express, {Application, Request, Response} from 'express';
import Database from './config/database';
import logger from 'morgan';
import prepareSeesion from './config/session';
import preparePasspostConfig from './config/passportConfig';
import router from './routers';
import apiV1Router from './routers/api/v1';

async function APP() {
  const app: Application = express();

  app.use(logger(process.env.ENV || 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.set('view engine', 'ejs');

  await prepareSeesion(app);
  await preparePasspostConfig(app);

  app.get('/testDatabase', async (req: Request, res: Response) => {
    const _list = await Database.query('SELECT datname FROM pg_database;');

    res.json(_list);
  });

  //Router middleware
  app.use(router);
  app.use(apiV1Router);

  return app;
}

export default APP;
