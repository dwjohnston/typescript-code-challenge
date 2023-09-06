import { sortDataIntoCustomersAndOrders } from "./sortInputDataIntoCustomersAndOrders"
import { Customer, Order } from "./types"

import inputData from "../data/data.json";


export type Database = {
    getCustomers: () => Promise<Array<Customer>>,
    getOrders: () => Promise<Array<Order>>
}

export async function getFakeDb(): Promise<Database> {

    const data = sortDataIntoCustomersAndOrders(inputData);

    return {
        getCustomers: () => {
            return Promise.resolve(data.customers)
        },
        getOrders: () => {
            return Promise.resolve(data.orders);
        }
    }
}