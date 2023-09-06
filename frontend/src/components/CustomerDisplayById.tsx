import { Suspense } from "react";
import { useSingleCustomer } from "../hooks/CustomerHooks";
import { LoadingFallback } from "./LoadingFallback";

export function CustomerDisplayById(props: {
    customerId: string;
}) {

    const { customerId } = props;

    const customerResult = useSingleCustomer(customerId);
    return <Suspense fallback={<LoadingFallback />}><span>{customerResult.data?.name}</span></Suspense>
}