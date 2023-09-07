import { Database } from "./db";
import { Customer, Order } from "./types";
import StreamArray from "stream-json/streamers/StreamArray";
import fs from "fs";
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


export async function sortDataIntoCustomersAndOrders(inputDataPath: string, db: Database): Promise<null> {

    // const customers = [] as Array<Customer>;
    // const orders = [] as Array<Order>;

    // return new Promise((res) => {
    //     const parser = StreamArray.withParser();
    //     let objectCounter = 0;
    //     parser.on('data', (data) => {
    //         console.log(data)
    //         return data.name === 'startObject' && ++objectCounter
    //     });
    //     parser.on('end', () => {
    //         res(null);
    //         console.log(`Found ${objectCounter} objects.`)
    //     });

    //     fs.createReadStream('data/data.json').pipe(parser);
    // })


    return new Promise((res) => {

        const inputData = JSON.parse(fs.readFileSync(inputDataPath, 'utf8')) as Array<InputData>;

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

        orders.forEach(v => db.addOrder(v))
        customers.forEach(v => db.addCustomer(v));

        res(null);


    })


}