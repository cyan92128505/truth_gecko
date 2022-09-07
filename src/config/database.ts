import { Sequelize } from "sequelize";

class Database {
    instance: Sequelize;
    constructor() {
        console.log(`process.env.LOCAL_DB: ${process.env.LOCAL_DB}`);
        console.log(`process.env.REMOTE_DB: ${process.env.REMOTE_DB}`);

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