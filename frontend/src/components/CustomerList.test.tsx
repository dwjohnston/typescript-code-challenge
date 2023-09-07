import { render, screen } from "@testing-library/react";
import { CustomerList } from "./CustomerList";
import { TestContext } from "../testUtils/TestContext";

describe(CustomerList, () => {
    it("Shows loading, and then displays the list", async () => {
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
            }
        }}>
            <CustomerList />
        </TestContext >)


        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Test User")).toBeInTheDocument();
        expect(screen.getByText("123 Test Street")).toBeInTheDocument();

    })
})