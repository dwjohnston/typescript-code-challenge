import express from "express";
import { Database } from "./db";
import { createGetCustomersHandler } from "./handlers";

const app = express();
const port = process.env.PORT ?? 3000;




export function createServer(db: Database) {
    app.get('/customers', createGetCustomersHandler(db))

    app.get('/orders', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

