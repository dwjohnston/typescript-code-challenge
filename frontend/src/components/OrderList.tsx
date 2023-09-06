import { Suspense } from "react";
import { useAllOrders } from "../hooks/OrderHooks";
import { LoadingFallback } from "./LoadingFallback";
import { Order } from "../services";
import { CustomerDisplayById } from "./CustomerDisplayById";

function OrderItemsList(props: {
    order: Order['order']
}) {


    return <>
        <table className="item-list-table">
            <thead>
                <tr>
                    <th>
                        Item
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Revenue
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.order.map((item) => {
                    return <tr>
                        <td>{item.item}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.revenue}</td>

                    </tr>
                })}
            </tbody>

        </table>


    </>
}

export function OrderListInner() {
    const ordersResult = useAllOrders();
    return <table className="orders-table">
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Vendor
                </th>
                <th>
                    Date
                </th>
                <th>
                    Customer
                </th>
                <th>
                    Items
                </th>

            </tr>
        </thead>
        <tbody>
            {ordersResult.data?.map((v) => {
                return <tr>
                    <td>{v.id}</td>
                    <td>{v.vendor}</td>
                    <td>{v.date}</td>
                    <td><CustomerDisplayById customerId={v.customer} /></td>
                    <td><OrderItemsList order={v.order} /></td>
                </tr>
            })}
        </tbody>
    </table>
}

export function OrderList() {

    // Let's use suspense, why not. 
    return <div className="orders-panel">
        <h2>Orders</h2>
        <Suspense fallback={<LoadingFallback />}><OrderListInner /></Suspense >
    </div>

}