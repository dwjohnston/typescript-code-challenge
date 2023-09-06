import { NextFunction, RequestHandler, Response, Request, } from "express";
import { Database } from "./db";
import { createGetCustomersHandler } from "./handlers";

describe(createGetCustomersHandler, () => {


    const testCustomers = [
        {
            "id": "11111111-1111-1111-1111-111111111111",
            "name": "Test User",
            "address": "123 Test Address Street"
        }
    ]
    const testOrders = [
        {
            "id": 1,
            "vendor": "Test Vendor",
            "date": "03/03/2017",
            "customer": "11111111-1111-1111-1111-111111111111",
            "order": [
                {
                    "item": "hat",
                    "quantity": 14,
                    "price": 8,
                    "revenue": 112
                },
            ]
        }
    ]


    it("Just returns the data", async () => {
        const db: Database = {
            getCustomers: async () => {
                return testCustomers
            },
            getOrders: async () => {
                return testOrders;
            }
        }

        const handler = createGetCustomersHandler(db);

        const fakeResJson = jest.fn()

        const fakeRes = {
            json: fakeResJson
        } as any as Response;


        const fakeReq = null as any as Request;
        const fakeNext = null as any as NextFunction;

        // I'm being a bit sketchy here. 
        // What I really want is something like RTLs `waitFor`. 
        // I can't believe this doesn't exist in Jest natively!
        await handler(fakeReq, fakeRes, fakeNext);
        expect(fakeResJson).toHaveBeenCalledWith(testCustomers)
    })

    it("If the data base throws an error, it will pass the error the next", async () => {
        const db: Database = {
            getCustomers: async () => {
                throw new Error("Something went wrong")
            },
            getOrders: async () => {
                return testOrders;
            }
        }

        const handler = createGetCustomersHandler(db);

        const fakeResJson = jest.fn()

        const fakeRes = {
            json: fakeResJson
        } as any as Response;


        const fakeReq = null as any as Request;
        const fakeNext = jest.fn();

        await handler(fakeReq, fakeRes, fakeNext);
        expect(fakeResJson).not.toHaveBeenCalled();
        expect(fakeNext).toHaveBeenCalled()
    })
})