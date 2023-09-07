import { getFakeDb } from './db';
import { populateDatabaseFromFile } from './populateDatabaseFromFile';



/**
 * These tests are using real 'fs', which might potentially be problematic if you had a lot of them/the files were big. 
 * 
 * (On the other hand, maybe it's a feature, not a bug, because you could start doing some performance testing)
 * 
 * And really, the complexity of this work is in the use of the streaming library,
 * So it makes sense that this is where we would want our tests.
 * We wouldn't want to abstract or mock away the file reading functionality, 
 * When that's what's likely to be broken.  
 * 
 * Question for the interviewers: 
 * How would you performance test this function? 
 * I've searched a few times, and as far as I know there isn't any tooling that
 * gives you deterministic or close to deterministic 
 * performance profiles for a test. 
 *  
 */
describe(populateDatabaseFromFile, () => {
    it('Converts the data properly', async () => {
        const outputData = {
            "customers": [
                {
                    "id": "8baa6dea-cc70-4748-9b27-b174e70e4b66",
                    "name": "Lezlie Stuther",
                    "address": "19045 Lawn Court"
                }
            ],
            "orders": [
                {
                    "id": 1,
                    "vendor": "acme",
                    "date": "03/03/2017",
                    "customer": "8baa6dea-cc70-4748-9b27-b174e70e4b66",
                    "order": [
                        {
                            "item": "hat",
                            "quantity": 14,
                            "price": 8,
                            "revenue": 112
                        },
                        {
                            "item": "cake",
                            "quantity": 9,
                            "price": 3,
                            "revenue": 27
                        },
                        {
                            "item": "ice",
                            "quantity": 10,
                            "price": 5,
                            "revenue": 50
                        },
                        {
                            "item": "candy",
                            "quantity": 6,
                            "price": 8,
                            "revenue": 48
                        }
                    ]
                }
            ]
        }

        const db = await getFakeDb();

        const result = await populateDatabaseFromFile("testData/test-input-data.json", db)
        expect(result).toBe(null);

        const customers = await db.getCustomers();
        const orders = await db.getOrders();

        expect(customers.length).toBe(outputData.customers.length);
        expect(orders.length).toBe(outputData.orders.length);
        expect(customers).toEqual(outputData.customers);
        expect(orders).toEqual(outputData.orders);
    });

    it.skip('If the same users appears multiple times in the input data, they will only appear once in the output data', () => {
        // In the interests of time, I'm not going to write for this functionality. 
        // This is something I'd flag in development. 
        // For example, if the user _does_ appear multiple times, 
        // But with different names, addresses
        // Then which name, address should be considered the canonical one? 

        // As it is, the input data does not appear to contain duplicates
    });

});