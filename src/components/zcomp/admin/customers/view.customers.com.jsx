import React from "react";
import { dateFormatter } from "../../../utilities";


const ViewCustomersComp = ({ customers, setCart, setSelectedCustomer, setEditCustomer, setAddCustomer }) => {
    return (
        <div>
            <button className="my-5 bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={()=>setAddCustomer(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                </svg>
                Add Customer
            </button>

            <div className="relative overflow-x-auto rounded-xl">
                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.length === 0 ?
                                <tr className="bg-white border-b">
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        Customers is empty.
                                    </td>
                                </tr> :

                                customers.map((cust, index) => {
                                    return (
                                        <tr className="bg-white border-b " key={cust.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {cust.username}
                                            </th>
                                            <td className="px-6 py-4">
                                                {cust.name || "Not set"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {cust.email || "Not set"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {cust.address || "Not set"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {cust.contact_no || "Not set"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {dateFormatter(cust.created_at)}
                                            </td>
                                            <td>
                                                <button className="mx-1 bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-semibold text-sm py-1 px-2 rounded"
                                                    name="edit"
                                                    onClick={() => {
                                                        setEditCustomer(true);
                                                        setSelectedCustomer(cust);
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                    </svg>
                                                </button>
                                                <button className="mx-1 bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white font-semibold text-sm py-1 px-2 rounded" name="cart" onClick={() => {
                                                    setCart(true);
                                                    setSelectedCustomer(cust);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                                    </svg>
                                                </button>
                                                {/* <button className="mx-1 bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-semibold text-sm py-1 px-2 rounded" name="delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1" viewBox="0 0 16 16">
                                                <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
                                            </svg>
                                        </button> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ViewCustomersComp;