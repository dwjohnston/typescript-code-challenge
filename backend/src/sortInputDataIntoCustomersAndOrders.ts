type Customer = {
    id: string;
    name: string;
    address: string;
}

type Item = {
    item: string;
    quantity: number;
    price: number;
    revenue: number;
}

type Order = {
    id: number;
    vendor: string;
    date: string;
    customer: string;
    order: Array<Item>;
}

type InputData = {
    id: number;
    vendor: string;
    date: string;
    customer: {
        id: string;
        name: string;
        address: string;
    }
    order: Record<string, {
        quantity: number;
        price: number;
    }>;
}


export function sortDataIntoCustomersAndOrders(inputData: Array<InputData>): {
    orders: Array<Order>,
    customers: Array<Customer>
} {

}