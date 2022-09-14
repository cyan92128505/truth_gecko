import {DataSource} from 'typeorm';
import {Router} from 'express';
import passport from 'passport';
import user from '../../../modules/user';

export default async function (database: DataSource) {
  const router = Router();
  const userLogic = await user(database);
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
