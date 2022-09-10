import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/database/userDTO';

export default {
  Signup: async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body;

      //generate hash salt for password
      const salt = await bcrypt.genSalt(12);

      //generate the hashed version of users password
      const hashed_password = await bcrypt.hash(password, salt);

      const user = await User.create({email, password: hashed_password});
      if (user) {
        res.status(201).json({message: 'new user created!'});
      }
    } catch (e) {
      console.log(e);
    }
  },
  Logout: async (req: Request, res: Response) => {
    req.session.destroy(err => {
      if (err) {
        return console.log(err);
      }
      res.redirect('/');
    });
  },
};
