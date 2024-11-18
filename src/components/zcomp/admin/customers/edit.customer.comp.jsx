import React, { useState } from "react";
import { useUpdateCustomerInfoBackend } from "../../../../backend/customer.backend";

const EditCustomerComp = ({ selectedCustomer, setSelectedCustomer, setEditCustomer, handleRefresh }) => {
    const [formData, setFormData] = useState({
        id: selectedCustomer ? selectedCustomer.id : 0,
        name: selectedCustomer ? selectedCustomer.name : "",
        email: selectedCustomer ? selectedCustomer.email : "",
        contact_no: selectedCustomer ? selectedCustomer.contact_no : "",
        address: selectedCustomer ? selectedCustomer.address : ""
    });

    const { response, loading, error, updateInfo } = useUpdateCustomerInfoBackend();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.contact_no) newErrors.contact_no = "Contact number is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            await updateInfo(formData)
            setSelectedCustomer(null)
            setEditCustomer(false)
            handleRefresh();
            // setFormData({ name: "", email: "", contact_no: "", address: "" }); // Reset form
            // setErrors({});
           
        } else {
            setErrors(validationErrors);
        }
    };

    const handleReset = () => {
        setSelectedCustomer(null)
        setEditCustomer(false)
        handleRefresh();
    }

    return (
        <div className="">
            {/* {response?handleReset():""} */}
            <button className="mt-10 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white font-semibold text-sm py-1 px-2 rounded flex items-center" onClick={() => setEditCustomer(false)}>
                <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.3 1.5a.5.5 0 0 1 .4.8l-7 7a.5.5 0 0 1 0 .7l7 7a.5.5 0 0 1-.8.6l-7-7a1.5 1.5 0 0 1 0-2l7-7a.5.5 0 0 1 .4-.1z" />
                    </svg>
                </span>
                Back
            </button>
            <h2 className="mt-8 text-xl font-semibold text-gray-700 mb-4">Update User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`border rounded-lg w-full p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`border rounded-lg w-full p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="contact_no">Contact No</label>
                    <input
                        type="tel"
                        id="contact_no"
                        name="contact_no"
                        value={formData.contact_no}
                        onChange={handleChange}
                        className={`border rounded-lg w-full p-2 ${errors.contact_no ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className={`border rounded-lg w-full p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditCustomerComp;