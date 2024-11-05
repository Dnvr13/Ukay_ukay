import React, { useState } from "react";
import { useCustomersBackend } from "../../../../backend/customer.backend";

import ViewCustomersComp from "./view.customers.com";
import CartCustomerComp from "./cart.customer.comp";
import EditCustomerComp from "./edit.customer.comp";
import AddCustomerComp from "./add.customer.comp";
import ViewCustomerOrdersComp from "./view.orders.cust.comp";


const CustomerComp = () => {
    const { customers, loading, error, refreshCustomers } = useCustomersBackend()
    const [cart, setCart] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    const [editCustomer, setEditCustomer] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [ordersCustomer, setOrdersCustomer] = useState(false);

    const handleRefresh = async () => {
        refreshCustomers();
    }

    return (
        <div>
            <h1 className="text-2xl font-medium text-slate-500">Customer</h1>
            <div className="mt-20">
                {!cart && !addCustomer && !editCustomer && !ordersCustomer ? <ViewCustomersComp customers={customers} setCart={setCart} setSelectedCustomer={setSelectedCustomer} setEditCustomer={setEditCustomer} setAddCustomer={setAddCustomer} setOrdersCustomer={setOrdersCustomer} /> : ""}
                {cart && !addCustomer && !editCustomer && !ordersCustomer ? <CartCustomerComp selectedCustomer={selectedCustomer} setCart={setCart} /> : ""}
                {!cart && !addCustomer && editCustomer && !ordersCustomer ? <EditCustomerComp selectedCustomer={selectedCustomer} setEditCustomer={setEditCustomer} setSelectedCustomer={setSelectedCustomer} handleRefresh={handleRefresh} /> : ""}
                {!cart && addCustomer && !editCustomer && !ordersCustomer ? <AddCustomerComp setAddCustomer={setAddCustomer} handleRefresh={handleRefresh} /> : ""}
                {!cart && !addCustomer && !editCustomer && ordersCustomer ? <ViewCustomerOrdersComp setOrdersCustomer={setOrdersCustomer} selectedCustomer={selectedCustomer} /> : ""}

            </div>
        </div>
    )
}


export default CustomerComp;