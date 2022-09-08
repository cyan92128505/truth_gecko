import { Sequelize } from "sequelize";

class Database {
    instance: Sequelize;
    constructor() {
        this.instance = new Sequelize(
            `${process.env.ENV === 'dev' ? process.env.LOCAL_DB : process.env.REMOTE_DB}`,
            {
                dialect: 'postgres',
                database: 'hub'
            }
        );
    }
}



export default Database;