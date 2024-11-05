import React, { useState } from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import ProfileCustomerOrdersComp from "../components/zcomp/profile/orders.cust.comp";

const ProfilePage = () => {
    // State to keep track of the currently selected sidebar item
    const [activeItem, setActiveItem] = useState("account");

    // Function to handle sidebar item click
    const handleItemClick = (item) => {
        setActiveItem(item);
        // You can add navigation logic here if needed
    };




    return (
        <div className="flex flex-col min-h-screen bg-gray-300">
            <HeaderComp />
            <main className="flex-grow flex p-5 md:p-10">
                {/* Sidebar */}
                <aside className="w-1/4 bg-white p-5 shadow-md rounded-md max-h-min">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <ul className="space-y-2 mb-10">
                        <li>
                            <a
                                href="#account"
                                className={`flex items-center p-2 rounded ${activeItem === "account" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-800 hover:bg-blue-50"}`}
                                onClick={() => handleItemClick("account")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                </svg>
                                Account
                            </a>
                        </li>
                        <li>
                            <a
                                href="#orders"
                                className={`flex items-center p-2 rounded ${activeItem === "orders" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-800 hover:bg-blue-50"}`}
                                onClick={() => handleItemClick("orders")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2m2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                                Orders
                            </a>
                        </li>
                        <li>
                            <a
                                href="#notifications"
                                className={`flex items-center p-2 rounded ${activeItem === "notifications" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-800 hover:bg-blue-50"}`}
                                onClick={() => handleItemClick("notifications")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                                </svg>
                                Notifications
                            </a>
                        </li>
                    </ul>
                </aside>

                {/* Content Container */}
                <div className="flex-grow bg-white p-5 shadow-md ml-4 rounded-md">
                    {/* Content goes here */}
                    {/* <h1 className="text-xl font-bold">Profile Information</h1> */}
                    {/* Add more content as needed */}
                    {/* {activeItem === "account" && <div className="h-screen">account</div>}
                    {activeItem === "orders" && <div className="h-screen">orders</div>}
                    {activeItem === "notifications" && <p>Your notifications will be shown here.</p>} */}

                    {activeItem === "orders" ? <ProfileCustomerOrdersComp /> : ""}


                </div>
            </main>
            {/* Footer */}
            <FooterComp />
        </div>
    );
}

export default ProfilePage;