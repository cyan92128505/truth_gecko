import express, { Application, NextFunction, Request, Response } from "express";
import database from "./config/database";
const main: Application = express();

main.use("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: database.getDialect().length });

});

export default main;