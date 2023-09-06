import { sortDataIntoCustomersAndOrders } from './sortInputDataIntoCustomersAndOrders';


describe(sortDataIntoCustomersAndOrders, () => {
    it('Converts the data properly', () => {

        const inputData = [{
            "id": 1,
            "vendor": "acme",
            "date": "03/03/2017",
            "customer": {
                "id": "8baa6dea-cc70-4748-9b27-b174e70e4b66",
                "name": "Lezlie Stuther",
                "address": "19045 Lawn Court"
            },
            "order": {
                "hat": {
                    "quantity": 14,
                    "price": 8
                },
                "cake": {
                    "quantity": 9,
                    "price": 3
                },
                "ice": {
                    "quantity": 10,
                    "price": 5
                },
                "candy": {
                    "quantity": 6,
                    "price": 8
                }
            }
        }];

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

        const result = sortDataIntoCustomersAndOrders(inputData)
        expect(result.customers.length).toBe(outputData.customers.length);
        expect(result.orders.length).toBe(outputData.orders.length);
        expect(result).toEqual(outputData);
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