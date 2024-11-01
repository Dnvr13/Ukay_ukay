import React, { useState } from "react";
import { useAddToCartBackend } from "../../../backend/cart.backend";


const ItemCard = ({id, name, price, images}) => {
    const navigate = useState();
    const { response, loading, error: errorAddCart, addToCart } = useAddToCartBackend();

    const handleAddToCart = async () => {       
        await addToCart(id, 1)
        if (errorAddCart) {
            const x = errorAddCart;
            if (x.includes('login')) {
                navigate('/login')
            }
            console.error(x);
        }

    }

    return (
        <li key={id} className="col-span-full sm:col-span-2 lg:col-span-1 group shadow-sm rounded border border-gray-50 hover:shadow-md relative">
            <a className="p-2 flex flex-col">
                {/* ::Picture */}
                <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden filter group-hover:brightness-110">
                    <img src={images[0].url} className="w-80 h-80 object-cover object-center" alt={name} />
                </div>

                {/* ::Product Details */}
                <div className="mt-5 pt-4 pb-2 border-t-2 border-gray-100 flex flex-col items-center">
                    {/* :::title */}
                    <h3 className="text-base text-gray-500 font-medium">{name}</h3>                            
                    {/* :::price */}
                    <p className="text-lg text-gray-700 font-semibold">{price}₱</p>
                </div>
            </a>

            {/* ::Action Icons */}
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    aria-label="Add to Favorites"
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.5 5.5 0 0121 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
                <button
                    aria-label="Add to Cart"
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"                
                    onClick={handleAddToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.5 9H5.25L4.5 6H3zM16.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                </button>
            </div>
        </li>
    )
}


export default ItemCard