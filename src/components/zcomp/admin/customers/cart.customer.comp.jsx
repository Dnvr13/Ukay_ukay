import React from "react";
import { useSelectedCustomerCartBackend } from "../../../../backend/cart.backend";


const CartCustomerComp = ({ setCart, selectedCustomer }) => {
    const { cartItems, loading, error } = useSelectedCustomerCartBackend(selectedCustomer.id)
    return (
        <div>
            <h1 className="text-xl font-medium text-slate-500"> <span className="text-slate-700">{selectedCustomer.username}</span> / Cart</h1>

            <button className="mt-10 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setCart(false)}>
                <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                    </svg>
                </span>
                Back
            </button>


            <div className="relative overflow-x-auto rounded-xl">
                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr className="bg-white border-b">
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    Cart is empty.
                                </td>
                            </tr>
                        ) : (
                            cartItems.map((cust, index) => {
                                return (
                                    <tr className="bg-white border-b" key={cust.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {cust.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {cust.quantity || "Not set"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cust.price || "Not set"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cust.total_price || "Not set"}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default CartCustomerComp;