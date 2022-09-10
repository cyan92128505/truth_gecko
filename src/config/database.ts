import {Sequelize} from 'sequelize';

const sequelizeConnection = new Sequelize(
  `${process.env.ENV === 'dev' ? process.env.LOCAL_DB : process.env.REMOTE_DB}`,
  {
    dialect: 'postgres',
    database: 'hub',
  }
);

export default sequelizeConnection;
