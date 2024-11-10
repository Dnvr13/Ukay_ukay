import React from "react";
import { handleLogout } from "../../utilities";

const SidebarComp = ({ isOpen, activeSetting, onSettingChange }) => {
    return (
        <div className={`bg-gray-800 text-white w-64 p-4 fixed h-full transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6d0a7a6f1e9238ee939c4890c892dfaf179c0c3228dd98cc1712dad2439eb75?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2" className="w-2/4 h-24" />
            <nav>
                <a href="#" className={`block py-2 ${activeSetting === 'dashboard' ? 'font-bold' : ''}`} onClick={() => onSettingChange('dashboard')}>Dashboard</a>
                <a href="#" className={`block py-2 ${activeSetting === 'products' ? 'font-bold' : ''}`} onClick={() => onSettingChange('products')}>Products</a>
                <a href="#" className={`block py-2 ${activeSetting === 'customers' ? 'font-bold' : ''}`} onClick={() => onSettingChange('customers')}>Customers</a>
                <a href="#" className={`block py-2 ${activeSetting === 'orders' ? 'font-bold' : ''}`} onClick={() => onSettingChange('orders')}>Orders</a>
                <a href="#" className="block py-2" onClick={()=>handleLogout()}>Logout</a>
            </nav>
        </div>
    );
};

export default SidebarComp;