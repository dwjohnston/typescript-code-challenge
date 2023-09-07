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

    const dbPromises = [] as Array<Promise<unknown>>;
    return new Promise((res, rej) => {
        const parser = StreamArray.withParser();
        let objectCounter = 0;


        parser.on("pipe", () => {
            console.info("Processing stream...")
        })

        parser.on('data', (data) => {

            const arrayItem = data.value;
            dbPromises.push(db.addCustomer(arrayItem.customer));

            const orderItems = Object.entries(arrayItem.order).map((v) => {
                const [key, value] = v as [string, InputData['order'][string]];

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

            dbPromises.push(db.addOrder({
                id: arrayItem.id,
                vendor: arrayItem.vendor,
                date: arrayItem.date,
                customer: arrayItem.customer.id,
                order: orderItems
            }))
        });

        parser.on("error", () => {
            rej("An error occurred while streaming");
        })

        parser.on('end', async () => {
            /**
             * Note on error handling. 
             * This solution is a 'abort if anything goes wrong'. 
             * Probably what you'd want is to log any errored items out to separate file, 
             * So you can manually inspect what went wrong
             */

            console.info("Streaming complete! Awaiting DB promises...")
            await (Promise.all(dbPromises));
            console.info("All DB promises resolved. Exiting.")
            res(null);
        });

        fs.createReadStream(inputDataPath).pipe(parser);
    })
}