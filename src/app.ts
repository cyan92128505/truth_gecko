import express, {Application, Request, Response} from 'express';
import logger from 'morgan';
import 'reflect-metadata';
import {database} from './config/database';
import prepareSeesion from './config/session';
import preparePasspostConfig from './config/passportConfig';
import router from './routers';
import apiV1Router from './routers/api/v1';

async function APP() {
  await database.initialize();

  const app: Application = express();

  app.use(logger(process.env.ENV || 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.set('view engine', 'ejs');

  await prepareSeesion(app);
  await preparePasspostConfig(app, database);

  app.get('/testDatabase', async (req: Request, res: Response) => {
    const _list = await database.query('SELECT datname FROM pg_database;');

    res.json(_list);
  });

  //Router middleware
  app.use(await router(database));
  app.use(await apiV1Router(database));

  return app;
}

export default APP;
