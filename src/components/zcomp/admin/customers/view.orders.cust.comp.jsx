import React from "react";
import { useCustomerOrdersBackend } from "../../../../backend/orders.backend";
import { dateFormatter } from "../../../utilities";

const ViewCustomerOrdersComp = ({ selectedCustomer, setOrdersCustomer }) => {
    const { orders } = useCustomerOrdersBackend(selectedCustomer.id);


    return (
        <div>

            <button className="my-10 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setOrdersCustomer(false)}>
                <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                    </svg>
                </span>
                Back
            </button>

            <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
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
                    </tr>
                </thead>
                <tbody>

                    {orders.length === 0 ?
                        <tr className="bg-white border-b">
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                Empty orders.
                            </td>
                        </tr> :
                        orders.map((order, index) => {
                            return (
                                <tr key={order.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {order.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        ${order.total_price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dateFormatter(order.date_order)}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ViewCustomerOrdersComp;