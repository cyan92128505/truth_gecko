import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = new Sequelize(
    process.env.LOCAL_DB as string,
    {
        dialect: 'postgres',
        database: 'hub'
    }
);

export default database;