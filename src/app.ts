import express, {Application} from 'express';
import logger from 'morgan';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import {database} from './config/database';
import prepareSeesion from './config/session';
import preparePasspostConfig from './config/passport_config';
import router from './routers';
import apiV1Router from './routers/api/v1';

async function APP() {
  await database.initialize();

  const app: Application = express();

  app.use(logger(process.env.ENV || 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static('public'));
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json',
      },
    })
  );

  app.set('view engine', 'ejs');

  await prepareSeesion(app);
  await preparePasspostConfig(app);

  //Router middleware
  app.use(await router());
  app.use(await apiV1Router());

  return app;
}

export default APP;
