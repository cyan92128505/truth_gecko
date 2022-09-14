import {Router} from 'express';
import {DataSource} from 'typeorm';
import layout from '../modules/layout';
import user from '../modules/user';

export default async function (database: DataSource) {
  const router = Router();
  const userLogic = await user(database);

  router.route('/').get(layout.LoginPage);
  router.route('/register').get(layout.LogoutPage);
  router.route('/home').get(layout.HomePage);
  router.route('/logout').get(userLogic.Logout);

  return router;
}
