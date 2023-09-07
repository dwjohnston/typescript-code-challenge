import request from "supertest";
import { Database } from "./db";
import { createServer } from "./server";
import { createTestDatabase } from "./testUtils";


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


describe("Contract Tests", () => {


    it("GET /doesnotexist", async () => {
        const db: Database = createTestDatabase({
            getCustomers: async () => {
                return testCustomers
            },
            getOrders: async () => {
                return []
            }
        })

        const app = createServer(db);
        const response = await request(app).get("/doesnotexist");
        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
    })

    it("GET /customers", async () => {
        const db: Database = createTestDatabase({
            getCustomers: async () => {
                return testCustomers
            },
            getOrders: async () => {
                return []
            }
        })

        const app = createServer(db);
        const response = await request(app).get("/customers");
        expect(response.ok).toBe(true);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch("application/json");
        expect(response.body).toEqual(testCustomers);
    });

    it("GET /customers - db fails", async () => {
        const db: Database = createTestDatabase({
            getCustomers: async () => {
                throw new Error("Something went wrong")
            },
            getOrders: async () => {
                return []
            }
        })

        const app = createServer(db);
        const response = await request(app).get("/customers");
        expect(response.ok).toBe(false);
        expect(response.status).toBe(500);
    });

    it("GET /orders", async () => {
        const db: Database = createTestDatabase({
            getCustomers: async () => {
                return []
            },
            getOrders: async () => {
                return testOrders
            }
        })

        const app = createServer(db);
        const response = await request(app).get("/orders");
        expect(response.ok).toBe(true);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch("application/json");
        expect(response.body).toEqual(testOrders);
    });

    it("GET /orders - db fails", async () => {
        const db: Database = createTestDatabase({
            getCustomers: async () => {
                return []
            },
            getOrders: async () => {
                throw new Error("Something went wrong")
            }
        })

        const app = createServer(db);
        const response = await request(app).get("/orders");
        expect(response.ok).toBe(false);
        expect(response.status).toBe(500);
    });

});

