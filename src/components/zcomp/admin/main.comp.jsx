import React from "react";
import ProductComp from "./products/products.comp";
import DashboardComp from "./dashboard.comp";
import CustomerComp from "./customers/customers.comp";
import OrdersAdminComp from "./orders/orders.comp";

const MainContentComp = ({ activeSetting }) => {
    const renderContent = () => {
        switch (activeSetting) {
            case 'dashboard':
                return (
                    <>
                        <DashboardComp />
                    </>
                );
            case 'products':
                return (
                    <>
                        <ProductComp />
                    </>
                );
            case 'customers':
                return (
                    <>
                        <CustomerComp />
                    </>
                );
            case 'orders':
                return (
                    <>
                        <OrdersAdminComp/>
                    </>
                );
            case 'settings':
                return (
                    <>
                        <h1>Settings</h1>
                        {/* Additional settings content can be added here */}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className="p-4 bg-gray-50 mx-2 mt-8 shadow-sm rounded-md min-h-screen">
            {renderContent()}
        </main>
    );
};

export default MainContentComp;