import { Database } from "./db";
import { RequestHandler } from 'express';


export function createGetCustomersHandler(db: Database): RequestHandler {
    return async (req, res, next) => {
        try {
            const orders = await db.getCustomers();
            res.json(orders)
        }
        catch (err) {
            next(err);
        }
    }
}

export function createGetOrdersHandler(db: Database): RequestHandler {
    return async (req, res, next) => {
        try {
            const orders = await db.getOrders();
            res.json(orders)
        }
        catch (err) {
            next(err);
        }
    }
}