import { Database } from "./db";

const DEFAULT_TEST_DATABASE: Database = {
    getCustomers: () => {
        throw new Error("Not implemented");
    },
    getOrders: () => {
        throw new Error("Not implemented");
    },
    addCustomer: () => {
        throw new Error("Not implemented");
    },
    addOrder: () => {
        throw new Error("Not implemented");
    },

}


/**
 * The purpose of this is to provide a database that has all the functions, 
 * while allowing the test to define the behavior for the they need
 * @param injectedOverides 
 * @returns 
 */
export function createTestDatabase(injectedOverides: Partial<Database>): Database {
    return {
        ...DEFAULT_TEST_DATABASE,
        ...injectedOverides
    };
}