import React, { useState } from "react";
import { dateFormatter } from "../../../utilities";


const ViewOrdersAdminComp = ({ orders, setOrderDetailOpen, setOrderDetail, handleRefresh, handleUpdateStatus ,loadingUpdateStatus}) => {

    return (
        <div>
            <div className="relative overflow-x-auto rounded-xl">
                <div className="flex space-x-2 justify-end">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 py-1 px-1 rounded mx-1 text-green-500 border border-green-500" viewBox="0 0 16 16">
                            <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                        </svg>
                        View Orders
                    </span>

                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 py-1 px-1 rounded mx-1 text-teal-500 border border-teal-500" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                        Order Status Complete
                    </span>

                </div>
                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.length === 0 ?
                            <tr className="bg-white border-b">
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    Orders is empty!
                                </td>
                            </tr> :
                            orders.map((order, index) => {
                                return (
                                    <tr key={order.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {order.customers.username}
                                        </th>
                                        <td scope="row" className="px-6 py-4">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${order.total_price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {dateFormatter(order.date_order)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="mx-1 bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-semibold text-sm py-1 px-2 rounded" name="delete"
                                                onClick={() => {
                                                    setOrderDetail(order);
                                                    setOrderDetailOpen(true);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                    <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                                </svg>
                                            </button>
                                            <button className="mx-1 bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white font-semibold text-sm py-1 px-2 rounded" name="delete"
                                                onClick={(e) => {                                                 
                                                    handleUpdateStatus(e);
                                                    handleRefresh();
                                                    
                                                }} data-id={order.id} disabled={loadingUpdateStatus}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewOrdersAdminComp