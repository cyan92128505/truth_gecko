import express, {Application, Request, Response} from 'express';
import Database from './config/database';
import logger from 'morgan';
import prepareSeesion from './config/session';
import preparePasspostConfig from './config/passportConfig';

async function APP() {
  const app: Application = express();

  app.use(logger(process.env.ENV || 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  await prepareSeesion(app);
  await preparePasspostConfig(app);

  app.get('/', async (req: Request, res: Response) => {
    const _list = await Database.query('SELECT datname FROM pg_database;');

    res.json(_list);
  });

  return app;
}

export default APP;
