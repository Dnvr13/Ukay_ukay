import React from "react";
import { useDashboardBackend, useLogOrdersBackend } from "../../../backend/logs.backend";

const DashboardComp = () => {
    const { logOrders, loading: loadingLogs, error: errorLogs } = useLogOrdersBackend()
    const {totalUser,monthlyIncome,loading:loadingDash,error:errorDash} = useDashboardBackend();
    return (
        <div>
            {/* Header */}
            <h1 className="text-2xl font-medium text-slate-500 mb-6">Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalUser}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Active Sessions</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalUser}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
                    <p className="text-2xl font-bold text-blue-600">${monthlyIncome||"0"}</p>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                <ul className="space-y-2">
                    {/* <li>🟢 User John Doe logged in.</li>
                    <li>🔴 User Jane Smith logged out.</li>
                    <li>🟡 User Alex Johnson updated their profile.</li> */}
                    {logOrders.map((log) => {
                        return (
                            <li key={log.id}>
                                <span className=" font-medium">{log.customers.username} » </span> {log.log} » <span className=" font-medium">Order</span> »<span className=" font-medium"> {log.order_detail_id}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Footer */}
        </div>
    );
}

export default DashboardComp;