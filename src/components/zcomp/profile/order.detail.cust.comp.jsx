import React from "react";
import { dateFormatter } from "../../utilities";
import { useOrderDetailsStatusBackend } from "../../../backend/orders.backend";
import { toast } from "sonner";

const ProfileCustomerOrderDetailComp = ({ order, setOrderDetailOpen }) => {
    const {loading,updateCancelStatus} = useOrderDetailsStatusBackend();

    let toastDisplayed = false;

    const handleCancelAction = async (isProceed) => {
        if (isProceed) {
            await updateCancelStatus(order.id)
        }
        toastDisplayed = false;
    };


    const handleCancelOrder = () => {       
        if (!toastDisplayed) {
            toastDisplayed = true; // Set the flag to true to indicate a toast is displayed

            toast.warning("Cancel this order ?", {
                classNames: {
                    toast: "flex-col items-start",
                    actionButton: "w-full justify-center !bg-rose-500 group-[.toast]:!text-white",
                    cancelButton: "w-full justify-center !bg-sky-500 group-[.toast]:!text-white",
                },
                description: "Are you sure you want to cancel the order? This cannot be undone.",
                action: {
                    label: "Cancel",
                    onClick: () => handleCancelAction(false),
                },
                cancel: {
                    label: "Yes",
                    onClick: () => handleCancelAction(true),
                },
                duration: Infinity,
                onDismiss: () => {
                    toastDisplayed = false; // Reset the flag when the toast is dismissed
                }
            });

        }

    };

    return (
        <div>

            {/* <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"> */}
            {/* <div className="bg-white rounded-lg shadow-lg p-6 w-1/3"> */}
            <div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>

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
                        {order.orders.map((item, index) => (
                            <li key={item.id}>{item.inventory.name} - ${item.price} (Qty: {item.quantity})</li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleCancelOrder()}
                        className={`mt-4 ${loading?"bg-gray-300":"bg-blue-500 hover:bg-blue-600"} text-white py-2 w-3/12 px-4 rounded  ${order.status!=='pending'?"hidden":""}`}>
                        Cancel Order
                    </button>
                </div>
            </div>
        </div >

    )
}


export default ProfileCustomerOrderDetailComp;