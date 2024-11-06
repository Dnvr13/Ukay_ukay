import React, { useState } from "react";
import ViewOrdersAdminComp from "./view.orders.comp";
import { useCustomersOrdersBackend, useOrderDetailsStatusBackend } from "../../../../backend/orders.backend";
import DetailOrdersAdminComp from "./detail.order.comp";


const OrdersAdminComp = () => {
    const { orders, loading, error,refreshOrders } = useCustomersOrdersBackend();
    const {loading:loadingUpdateStatus,updateCompleteStatus} = useOrderDetailsStatusBackend()
    const [orderDetailOpen, setOrderDetailOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);

    const handleUpdateStatus =async(e)=>{      
        const orderId = e.currentTarget.dataset.id;
        console.log(orderId);
        await updateCompleteStatus(orderId)
    }

    const handleRefresh = async()=>{
        refreshOrders();
    }

    return (
        <div>
            <h1 className="text-2xl font-medium text-slate-500">Orders</h1>
            <div className="mt-20">
                {
                    !orderDetailOpen?<ViewOrdersAdminComp orders={orders} setOrderDetail={setOrderDetail} setOrderDetailOpen={setOrderDetailOpen} handleRefresh={handleRefresh} handleUpdateStatus={handleUpdateStatus} loadingUpdateStatus={loadingUpdateStatus}/>:
                    <DetailOrdersAdminComp orderDetail={orderDetail} setOrderDetailOpen={setOrderDetailOpen}/>
                }
                
            </div>
        </div>
    )
}

export default OrdersAdminComp