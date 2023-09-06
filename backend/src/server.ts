import express, { Express } from "express";
import { Database } from "./db";
import { createGetCustomersHandler, createGetOrdersHandler } from "./handlers";



function defaultErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    // And of course you could inspect the error object and return 403 type errors here
    // eg. 
    // if (err instanceof UnauthorizedError){
    //     res.status(401);    
    // }

    res.status(500)
    res.send("something went wrong")
}

export function createServer(db: Database): Express {

    const app = express();

    app.get("/aaa", (req, res) => {
        throw new Error("aaa");
    })
    app.get('/customers', createGetCustomersHandler(db))
    app.get('/orders', createGetOrdersHandler(db))

    app.use(defaultErrorHandler)
    return app;

}

