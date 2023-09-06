import { Customer, Order } from "./types";

type InputData = {
    id: number;
    vendor: string;
    date: string;
    customer: {
        id: string;
        name: string;
        address: string;
    }

    // I need to look into why partial is necessary 
    // https://www.typescriptlang.org/play?#code/MYewdgzgLgBAJgQygmBeGBtAUDXMDeOexCAXDAIwA0MRxuARuQEx0wC+Nbh9eZlbdlgC6WMVACeABwCmMAGoIANgFc56AEozQAJzgAeaDoCWYAOY0wKgLYMZOgHwBuWmIBmKsMCjHwMBMDAMlJQEIqqMgAUAG7KahDkAII6OggS+uFqDgCUBGJCYgFBIWFxUYjI2UA
    order: Partial<Record<string, {
        quantity: number;
        price: number;
    }>>

}


export function sortDataIntoCustomersAndOrders(inputData: Array<InputData>): {
    orders: Array<Order>,
    customers: Array<Customer>
} {

    const customers = [] as Array<Customer>;
    const orders = [] as Array<Order>;

    inputData.forEach((v) => {
        customers.push(v.customer)

        const orderItems = Object.entries(v.order).map((v) => {
            const [key, value] = v;

            if (!value) {
                throw new Error("Encountered a nullish value");
            }

            return {
                item: key,
                quantity: value.quantity,
                price: value.price,
                revenue: value.quantity * value.price
            };
        });

        orders.push({
            id: v.id,
            vendor: v.vendor,
            date: v.date,
            customer: v.customer.id,
            order: orderItems
        })
    })


    return {
        orders,
        customers
    }

}