import express, {Application, Request, Response} from 'express';
import Database from './config/database';
import logger from 'morgan';

async function APP() {
  const app: Application = express();
  const database = new Database();

  app.use(logger(process.env.ENV || 'dev'));

  app.get('/', async (req: Request, res: Response) => {
    const _list = await database.instance.query(
      'SELECT datname FROM pg_database;'
    );

    res.json(_list);
  });

  return app;
}

export default APP;
