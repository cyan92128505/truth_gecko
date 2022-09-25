import {Body, Controller, Post, Route, SuccessResponse, Tags} from 'tsoa';

import UserRepository from './models/users';

type CreateUserParams = {
  email: string;
  password: string;
};

@Route('users')
@Tags('user')
export class UserController extends Controller {
  /**
   * User Create
   * @param requestBody
   */
  @SuccessResponse(201, 'Created')
  @Post()
  async createUser(@Body() requestBody: CreateUserParams): Promise<void> {
    const repo = await UserRepository();
    const user = repo.create(requestBody);
    repo.save(user);
  }
}
