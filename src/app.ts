

import express, { Application, NextFunction, Request, Response } from "express";
import Database from "./config/database";

async function APP() {
    const app: Application = express();
    const database = new Database();
    app.use("/", async (req: Request, res: Response, next: NextFunction) => {
        const _list = await database.instance.query('SELECT * FROM users');


        res.json(_list);
    });

    return app;
}

export default APP;