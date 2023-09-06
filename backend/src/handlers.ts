import { Database } from "./db";
import { RequestHandler } from 'express';


export function createGetCustomersHandler(db: Database): RequestHandler {
    return async (req, res) => {
        const orders = await db.getCustomers();
        res.json(orders)
    }
}

export function createGetOrdersHandler(db: Database): RequestHandler {
    return async (req, res) => {
        const orders = await db.getOrders();
        res.json(orders)
    }
}