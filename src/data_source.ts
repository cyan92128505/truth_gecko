require('dotenv').config();

import {DataSourceOptions} from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: `${
    process.env.ENV === 'dev' ? process.env.LOCAL_DB : process.env.REMOTE_DB
  }`,
  logging: true,
  entities: ['src/models/database/*.ts'],
  migrations: ['src/migrations/*.ts'],
};

export default dataSourceOptions;
