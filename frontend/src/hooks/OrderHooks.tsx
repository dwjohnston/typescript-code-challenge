import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServiceProvider";

export function useAllOrders() {

    const { getAllOrders } = useServices();
    return useSuspenseQuery({
        queryKey: ["orders", "LIST"],
        queryFn: async () => {
            const result = await getAllOrders();

            if (result.data) {
                return result.data;
            } else {
                throw new Error(result.error.statusText)
            }

        }
    })
}