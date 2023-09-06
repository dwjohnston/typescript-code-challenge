export type Customer = {
    id: string;
    name: string;
    address: string;
}

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

