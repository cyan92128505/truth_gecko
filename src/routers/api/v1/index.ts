import {Router} from 'express';
import passport from 'passport';
import user from '../../../modules/user';

const router = Router();

router.route('/api/v1/signin').post(
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/home',
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (req, res) => {}
);
router.route('/api/v1/signup').post(user.Signup);

export default router;
