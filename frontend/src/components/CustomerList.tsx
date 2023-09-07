import { Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";
import { useAllCustomers } from "../hooks/CustomerHooks";

function CustomersListInner() {
    const customersResult = useAllCustomers();

    return <table className="customers-table">
        <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Address
                </th>

            </tr>
        </thead>
        <tbody>
            {customersResult.data?.map((v) => {
                return <tr key={v.id}>
                    <td>{v.name}</td>
                    <td>{v.address}</td>

                </tr>
            })}
        </tbody>
    </table>
}

export function CustomerList() {
    return <div className="customers-panel">
        <h2>Customers</h2>
        <Suspense fallback={<LoadingFallback />} >
            <CustomersListInner />
        </Suspense>
    </div >
}