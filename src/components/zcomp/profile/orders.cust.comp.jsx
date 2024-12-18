import React, { useState } from "react";
import { useCustomerOrdersBackend } from "../../../backend/orders.backend";
import Cookies from "js-cookie";
import { dateFormatter } from "../../utilities";
import ProfileCustomerOrderTableComp from "./order.table.cust.comp";
import ProfileCustomerOrderDetailComp from "./order.detail.cust.comp";


const ProfileCustomerOrdersComp = () => {
    const token = Cookies.get("token")
    const uId = token.split('-')[0]
    const { orders, loading, error,refreshOrders} = useCustomerOrdersBackend(uId);
    const [orderDetailOpen,setOrderDetailOpen] = useState(false);
    const [orderDetail,setOrderDetail] = useState(null);

    const handleRefresh =async()=>{
        await refreshOrders();
    }

    return (
        <div>
            {!orderDetailOpen?<ProfileCustomerOrderTableComp orders={orders} setOrderDetailOpen={setOrderDetailOpen} setOrderDetail={setOrderDetail}/>
            :<ProfileCustomerOrderDetailComp order={orderDetail} setOrderDetailOpen={setOrderDetailOpen} handleRefresh={handleRefresh} />}

        </div>
    )
}

export default ProfileCustomerOrdersComp;