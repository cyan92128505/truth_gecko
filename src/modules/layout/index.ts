import {Request, Response} from 'express';

export default {
  HomePage: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.redirect('/');
    }

    const sessionExpireTime =
      new Date(`${req.session.cookie.expires}`).valueOf() -
      new Date().valueOf();

    res.render('home', {
      sessionID: req.sessionID,
      sessionExpireTime: sessionExpireTime,
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
    });
  },
  LoginPage: async (req: Request, res: Response) => res.render('auth/login'),
  LogoutPage: async (req: Request, res: Response) =>
    res.render('auth/register'),
};
