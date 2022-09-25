import express, {Application} from 'express';
import logger from 'morgan';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import {database} from './config/database';
import prepareSeesion from './config/session';
import preparePasspostConfig from './config/passport_config';
import router from './routers';
import apiV1Router from './routers/api/v1';
import swaggerDocument from './.build/swagger.json';

import {RegisterRoutes} from './.build/routes';

async function APP() {
  await database.initialize();

  const app: Application = express();

  app.use(logger(process.env.ENV || 'dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static('public'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.set('view engine', 'ejs');

  await prepareSeesion(app);
  await preparePasspostConfig(app);
  await RegisterRoutes(app);

  //Router middleware
  app.use(await router());
  app.use(await apiV1Router());

  return app;
}

export default APP;
