import { Customer, Order } from "./types"



export type Database = {
    getCustomers: () => Promise<Array<Customer>>,
    getOrders: () => Promise<Array<Order>>,

    addCustomer: (customer: Customer) => Promise<null>,
    addOrder: (order: Order) => Promise<null>,
}

export async function getFakeDb(): Promise<Database> {

    const data = {
        customers: [] as Array<Customer>,
        orders: [] as Array<Order>,
    }

    return {
        getCustomers: () => {
            return Promise.resolve(data.customers)
        },

        getOrders: () => {
            return Promise.resolve(data.orders);
        },


        addCustomer: async (customer: Customer) => {
            data.customers.push(customer);
            return null;
        },
        addOrder: async (order: Order) => {
            data.orders.push(order);
            return null;
        }
    }
}