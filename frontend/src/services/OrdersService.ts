import { ApiReturnType } from "./ types";

export type Item = {
    item: string;
    quantity: number;
    price: number;
    revenue: number;
}

export type Order = {
    id: number;
    vendor: string;
    date: string;
    customer: string;
    order: Array<Item>;
}



export async function getAllOrders(): Promise<ApiReturnType<Array<Order>>> {
    const result = await fetch("/orders");

    if (!result.ok) {
        return {
            data: null,
            error: {
                status: result.status,
                statusText: result.statusText
            }
        }
    }

    const body = await result.json();
    // would validate the body here 
    // Or, we're using client generator that is doing all this for us. 

    return {
        data: body as Array<Order>,
        error: null,
    }
}