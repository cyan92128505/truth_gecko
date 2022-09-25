require('dotenv').config();

import {DataSourceOptions} from 'typeorm';
import {User} from './modules/user/models/users';
import {Credential} from './modules/credential/models/credentials';
import {History} from './modules/history/models/history';
import {Token} from './modules/auth/models/tokens';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: `${
    process.env.ENV === 'dev' ? process.env.LOCAL_DB : process.env.REMOTE_DB
  }`,
  logging: true,
  entities: [User, Credential, History, Token],
  migrations: ['src/migrations/*.ts'],
};

export default dataSourceOptions;
