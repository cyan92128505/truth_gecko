import {Router} from 'express';
import layout from '../modules/layout';
import user from '../modules/user';
const router = Router();

router.route('/').get(layout.LoginPage);
router.route('/register').get(layout.LogoutPage);
router.route('/home').get(layout.HomePage);
router.route('/logout').get(user.Logout);

export default router;
