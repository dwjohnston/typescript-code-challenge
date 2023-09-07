import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServiceProvider";
import { Customer, } from "../services";

export function useAllCustomers() {

    const { getAllCustomers } = useServices();
    const qc = useQueryClient();
    return useSuspenseQuery({
        queryKey: ["customers", "LIST"],
        queryFn: async () => {
            const result = await getAllCustomers();

            if (result.data) {
                result.data.forEach((v) => {
                    qc.setQueryData(["customers", v.id], v);
                })
                return result.data;
            } else {
                throw new Error(result.error.statusText)
            }

        }
    })
}


export function useSingleCustomer(id: string) {
    useAllCustomers();
    return useSuspenseQuery<Customer>({
        queryKey: ["customers", id],
        queryFn: async () => {
            // If we had a 'GET /customer/{id}' endpoint, we would call it here. 
            // But we're just relying on the call of all customers to fetch the individual one for us

            throw new Error("I don't expect this to ever be called");
        }
    })
}