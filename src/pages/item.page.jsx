import React, { useEffect, useState } from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import { useProductCategoryBackend, useProductsBackend } from "../backend/inventory.backend";
import ProductGridComp from "../components/zcomp/home/grid.comp";


const ItemsPage = () => {
    const { products, loading: loadingProduct } = useProductsBackend(false);
    const { categories, loading: loadingCategories } = useProductCategoryBackend();

    const [filter, setFilter] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(5000);

    // Update filtered products when products are loaded or changed
    useEffect(() => {
        if (!loadingProduct) {
            setFilter(products);
        }
    }, [loadingProduct, products]);

    // Handle price input change
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    // Handle category selection
    const handleSelectedCategory = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategories(selectedValue ? [selectedValue] : []);
    };

    // Filter products based on price and selected categories
    const filterProducts = (items) => {
        return items.filter(item => {
            const isInPriceRange = item.price >= 0 && item.price <= price;
            const isInSelectedCategory = selectedCategories.length === 0 || 
                item.inventory_category.some(category =>
                    selectedCategories.includes(category.category.name)
                );
            return isInPriceRange && isInSelectedCategory;
        });
    };

    // Apply filters and update filtered products
    const applyFilter = () => {
        const filteredItems = filterProducts(products);
        console.log(selectedCategories);
        console.log(filteredItems);
        setFilter(filteredItems);
    };

    // Call applyFilter whenever price limit or selected categories change
    useEffect(() => {
        applyFilter();
    }, [price, selectedCategories]);




    return (
        <div className="flex flex-col min-h-screen bg-gray-300">
            <HeaderComp />
            <main className="flex-grow flex md:flex-row p-5 md:p-10">
                <div className="w-64 h-auto bg-white shadow-md p-5 rounded-md max-h-min max-w-min">
                    <h2 className="text-lg font-semibold mb-4 mr-32">Filters</h2>

                    <div className="mb-4">
                        <h3 className="font-medium">Price Range</h3>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            step={price}
                            value={price} // Bind the value to state
                            onChange={handlePriceChange} // Update state on change
                            className="w-full mt-2"
                        />
                        <div className="flex justify-between text-sm">
                            <span>₱0</span>
                            <span>to</span>
                            <span>₱{price} {/* Adjusting display value based on range */}</span>
                        </div>
                    </div>


                    <div className="mb-4">
                        <h3 className="font-medium">Category</h3>
                        <select className="w-full mt-2 p-2 border rounded" onChange={handleSelectedCategory}>
                            <option value="">Select Category</option>
                            {
                                categories.map((item) => {
                                    return (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    )
                                })
                            }
                            {/* Add more categories as needed */}
                        </select>
                    </div>



                    <div className="flex flex-col items-center">
                        <hr className="w-full border-t border-gray-300 my-4" />
                        {/* <button
                            className="border border-blue-300 text-blue-500 bg-transparent hover:bg-blue-300 hover:text-white font-semibold py-2 px-4 rounded transition duration-300"
                            onClick={applyFilter}
                        >
                            Apply filter
                        </button> */}
                    </div>
                    {/* Additional filters can be added here */}
                </div>
                {/* Main content area */}
                <div className="flex-grow p-5 bg-white rounded shadow-md ml-5">
                    {/* Your main content goes here */}
                    <ProductGridComp products={filter} loading={loadingProduct} />
                </div>
            </main>
            <FooterComp />
        </div>

    )
}


export default ItemsPage;