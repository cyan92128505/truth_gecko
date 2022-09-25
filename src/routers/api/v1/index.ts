import {Router} from 'express';
import passport from 'passport';
import UserRouter from '../../../modules/user';

export default async function () {
  const router = Router();
  const userLogic = await UserRouter();
  router.route('/api/v1/signin').post(
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureMessage: true,
    }),
    (req, res) => {
      res.redirect('/');
    }
  );
  router.route('/api/v1/signup').post(userLogic.Signup);

  return router;
}
