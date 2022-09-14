import {DataSource} from 'typeorm';

export const database = new DataSource({
  type: 'postgres',
  url: `${
    process.env.ENV === 'dev' ? process.env.LOCAL_DB : process.env.REMOTE_DB
  }`,
  database: process.env.CI_DB_NAME,
  logging: true,
  entities: ['src/models/database/*.ts'],
});

export default database;
