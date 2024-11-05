import React, { useState } from "react";
import ViewOrdersAdminComp from "./view.orders.comp";
import { useCustomersOrdersBackend } from "../../../../backend/orders.backend";
import DetailOrdersAdminComp from "./detail.order.comp";


const OrdersAdminComp = () => {
    const { orders, loading, error } = useCustomersOrdersBackend();
    const [orderDetailOpen, setOrderDetailOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);
    return (
        <div>
            <h1 className="text-2xl font-medium text-slate-500">Orders</h1>
            <div className="mt-20">
                {
                    !orderDetailOpen?<ViewOrdersAdminComp orders={orders} setOrderDetail={setOrderDetail} setOrderDetailOpen={setOrderDetailOpen}/>:
                    <DetailOrdersAdminComp orderDetail={orderDetail} setOrderDetailOpen={setOrderDetailOpen}/>
                }
                
            </div>
        </div>
    )
}

export default OrdersAdminComp