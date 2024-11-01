import React from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import { useProductsBackend } from "../backend/inventory.backend";
import ProductGridComp from "../components/zcomp/home/grid.comp";


const ItemsPage = () => {
    const { products, loading: loadingProduct } = useProductsBackend();

    return (
        <div className="flex flex-col min-h-screen bg-gray-300">
            <HeaderComp />
            <main className="flex-grow flex md:flex-row p-5 md:p-10">
                <div className="w-64 h-auto bg-white shadow-md p-5 rounded-md max-h-min">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div className="mb-4">
                        <h3 className="font-medium">Price Range</h3>
                        <input type="range" min="0" max="1000" className="w-full mt-2" />
                        <div className="flex justify-between text-sm">
                            <span>$0</span>
                            <span>$1000</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium">Category</h3>
                        <select className="w-full mt-2 p-2 border rounded">
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Garden</option>
                            {/* Add more categories as needed */}
                        </select>
                    </div>
                    <div className="flex flex-col items-center">                        
                        <hr className="w-full border-t border-gray-300 my-4" />                        
                        <button
                            className="border border-blue-300 text-blue-500 bg-transparent hover:bg-blue-300 hover:text-white font-semibold py-2 px-4 rounded transition duration-300">
                            Apply filter
                        </button>
                    </div>
                    {/* Additional filters can be added here */}
                </div>
                {/* Main content area */}
                <div className="flex-grow p-5 bg-white rounded shadow-md ml-5">
                    {/* Your main content goes here */}
                    <ProductGridComp products={products} loading={loadingProduct}/>
                </div>
            </main>
            <FooterComp />
        </div>

    )
}


export default ItemsPage;