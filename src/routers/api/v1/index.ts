import {Router} from 'express';
import passport from 'passport';
import user from '../../../modules/user';

const router = Router();

router.route('/api/v1/signin').post(
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect('/');
  }
);
router.route('/api/v1/signup').post(user.Signup);

export default router;
