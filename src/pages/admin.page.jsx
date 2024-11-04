import React, { useState } from 'react';
import SidebarComp from '../components/zcomp/admin/sidebar.comp';
import NavbarComp from '../components/zcomp/admin/navbar.comp';
import MainContentComp from '../components/zcomp/admin/main.comp';

const Admin = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeSetting, setActiveSetting] = useState('dashboard');

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    const handleSettingChange = (setting) => {
        setActiveSetting(setting);
        if (!isSidebarOpen) {
            setSidebarOpen(true);
        }
    };

    return (
        <div className="flex h-screen">
            <SidebarComp isOpen={isSidebarOpen} activeSetting={activeSetting} onSettingChange={handleSettingChange} />

            <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <NavbarComp onToggle={toggleSidebar} />
                <MainContentComp activeSetting={activeSetting} />
                <footer className="p-8 m-5 text-center text-gray-500">
                    &copy; 2024 Ukay-ukay. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Admin;