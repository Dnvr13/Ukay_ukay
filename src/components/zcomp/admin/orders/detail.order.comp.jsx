import React from "react";
import { dateFormatter } from "../../../utilities";

const DetailOrdersAdminComp = ({ orderDetail, setOrderDetailOpen }) => {
    const order = orderDetail;   
    return (
        <div>

            <div>
                <div>
                    <h2 className="text-lg font-medium mb-4">Order Details</h2>
                    <h2 className="text-base font-medium mb-4">{order.customers.username} / {order.id}</h2>

                    <button className="my-10 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setOrderDetailOpen(false)}>
                        <span className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                            </svg>
                        </span>
                        Back
                    </button>

                    <p><strong>Transaction ID:</strong> {order.id}</p>
                    <p><strong>Total:</strong> ${order.total_price}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Date:</strong> {dateFormatter(order.date_order)}</p>
                    {/* Add more details as needed */}

                    <h3 className="mt-4 font-semibold">Items:</h3>
                    <ul className="list-disc pl-5">
                        {/* <li>Please wait your item is being process.</li> */}
                        {order.orders.map((item,index)=> (
                            <li key={item.id}>{item.inventory.name} - ${item.price} (Qty: {item.quantity})</li>
                        ))}
                    </ul>

                    {/* <button
                        onClick={() => setOrderDetailOpen(false)}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Close
                    </button> */}
                </div>
            </div>

        </div>
    )
}

export default DetailOrdersAdminComp;