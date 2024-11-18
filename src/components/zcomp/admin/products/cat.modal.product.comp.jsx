import React, { useState } from "react";




const ModalProductCategory = ({ product, isOpen, onClose, categories, isCustom, setIsCustom, handleRemoveCategory, handleAddCategory, cat, handleCat, loading }) => {
    if (!isOpen) return null;


    // filter the categories from selectedCategories
    const selectedNames = product.inventory_category.map(item => item.category.name);
    const filteredCategories = categories.filter(category => !selectedNames.includes(category.name));

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleAddCategory(cat.cat, cat.cat_id, product.id);
    };


    const customCategory = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="cat"></label>
                <input
                    id="cat"
                    name="cat"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter custom category"
                    value={cat.cat}
                    onChange={handleCat}
                />


                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Add Category"}
                    </button>
                </div>
            </form>
        )
    }

    const notCustomCategory = () => {
        return (
            <form onSubmit={handleSubmit}>
                <select
                    id="category"
                    name="category"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
                    onChange={handleCat}>
                    <option value="">Select a category</option>
                    {
                        filteredCategories.map((item) => {
                            return (<option key={item.id} value={item.id}> {item.name} </option>)
                        })
                    }
                </select>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className={`${loading?"bg-slate-200":"bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded  transition duration-200`}
                        disabled={loading}>
                        {loading ? "Loading..." : "Add Category"}
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm w-full">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Product Category</h2>
                <h2 className="text-base text-gray-800 mb-2">Product: {product.name}</h2>

                <label htmlFor="shipping-status" className="block text-sm font-medium text-gray-700 mb-2">Current Category
                </label>
                <div className="flex flex-wrap">

                    {
                        product.inventory_category.length === 0 ?
                            <div className="flex items-center bg-stone-300 text-black rounded-full px-2 py-1 min-w-min mr-1 mt-1">
                                <span className="text-[9px] font-medium overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[90px]">
                                    No category
                                </span>
                            </div>
                            : product.inventory_category.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center bg-stone-900 text-white rounded-full px-3 py-1 min-w-min mr-1 mt-1">
                                        <span className="text-xs font-medium">{item.category.name}</span>
                                        <button type="button" className="ml-2 text-white hover:text-red-400 focus:outline-none" aria-label="Remove chip" onClick={() => {
                                            handleRemoveCategory(item.id)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            })}

                </div>

                <hr className="my-2"></hr>

                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isCustom}
                        onChange={() => setIsCustom(!isCustom)}
                        className="sr-only peer"
                    />
                    <div className={`relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out 
                ${isCustom ? 'bg-blue-600' : ''} 
                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                `}>
                        <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ease-in-out 
                    ${isCustom ? 'translate-x-full' : ''} 
                    `}></span>
                    </div>
                    <span className="ms-3 text-sm font-medium text-gray-900">{isCustom ? "Use the current categories" : "Want to add to new/custom category?"}</span>
                </label>

                {isCustom ?
                    customCategory() :
                    notCustomCategory()}
            </div>
        </div>
    );
};

export default ModalProductCategory;