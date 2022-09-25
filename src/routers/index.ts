import {Router} from 'express';
import layout from '../modules/layout';
import UserRouter from '../modules/user';

export default async function () {
  const router = Router();
  const userLogic = await UserRouter();

  router.route('/').get(layout.LoginPage);
  router.route('/login').get(layout.LoginPage);
  router.route('/register').get(layout.LogoutPage);
  router.route('/home').get(layout.HomePage);
  router.route('/logout').get(userLogic.Logout);

  return router;
}
