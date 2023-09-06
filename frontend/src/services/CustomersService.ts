import { ApiReturnType } from "./ types";

export type Customer = {
    id: string;
    name: string;
    address: string;
}

export async function getAllCustomers(): Promise<ApiReturnType<Array<Customer>>> {
    const result = await fetch("/customers");

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
        data: body as Array<Customer>,
        error: null,
    }
}