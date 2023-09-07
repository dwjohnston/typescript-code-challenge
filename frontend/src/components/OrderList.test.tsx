import { OrderList } from "./OrderList";
import { render, screen } from "@testing-library/react";
import { TestContext } from "../testUtils/TestContext";
describe(OrderList, () => {
    it("Shows loading, and then displays the list, the user's name is resolved", async () => {
        render(<TestContext services={{
            getAllCustomers: async () => {
                return {
                    error: null,
                    data: [
                        {
                            id: "xxx-xxx-xxx",
                            name: "Test User",
                            address: "123 Test Street"
                        }
                    ]
                }
            },
            getAllOrders: async () => {
                return {
                    error: null,
                    data: [
                        {
                            id: 1,
                            vendor: "Acme",
                            date: "01/01/2011",
                            customer: "xxx-xxx-xxx",
                            order: [
                                {
                                    item: "hat",
                                    quantity: 2,
                                    price: 3,
                                    revenue: 6,
                                }
                            ]
                        }
                    ]
                }
            }
        }}>
            <OrderList />
        </TestContext >)


        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("hat")).toBeInTheDocument();
        expect(screen.getByText("Acme")).toBeInTheDocument();
        expect(screen.getByText("Test User")).toBeInTheDocument();

        // RTL doesn't support table querying particularly well. 
        // What you really want is something like 
        // const row = findRowByText(...); 
        // expect(row).toContainCellWithText(...); 
    })
})