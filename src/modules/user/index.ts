import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import UserRepository from './models/users';

export default async function UserRouter() {
  return {
    Signup: async (req: Request, res: Response) => {
      const userRepository = await UserRepository();
      try {
        const {email, password, name} = req.body;

        //generate hash salt for password
        const salt = await bcrypt.genSalt(12);

        //generate the hashed version of users password
        const hashed_password = await bcrypt.hash(password, salt);

        const user = await userRepository.create({
          name,
          email,
          password: hashed_password,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        const results = await userRepository.save(user);

        console.dir(results);

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
}
