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



    /**
     * I'm not particularly happy with the style of tests here. 
     * You can see I've got contract tests to, but the idea here, is if say there was some kind of business logic 
     * in the handler, we might want to test it as a function of the database (and other services) and parameters
     * without having all of the baggage of the middleware etc. 
     * 
     * The problem with these tests as they currently are, is that because the handler has access to
     * the full express res/req objects, they could be doing all sorts, setting headers, etc. 
     * At that point, it doesn't seem much different to the contract tests.
     *
     * If you were to continue down this path, maybe use a library like: https://github.com/eugef/node-mocks-http
     * 
     */


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
        // What I really want is something like RTL's `waitFor`. 
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