import React, { useState } from "react";
import { useAddToCartBackend } from "../../../backend/cart.backend";
import { useNavigate } from "react-router-dom";
import { dateFormatterAgo } from "../../utilities";


const FeaturedProductComp = ({ id, name, price, created_at, images }) => {
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
    const navigate = useNavigate();
    const { response, loading, error: errorAddCart, addToCart } = useAddToCartBackend();

    const handleAddToCart = async () => {
        if (quantity === 1) {
            return;
        }
        await addToCart(id, quantity)
        if (errorAddCart) {
            const x = errorAddCart;
            if (x.includes('login')) {
                navigate('/login')
            }
            console.error(x);
        }

    }

    return (
        <section className="mb-10">
            <h2 className="text-3xl font-extrabold mb-5">Limited Ukay-Ukay</h2>
            <section className="flex gap-10 bg-white rounded-lg p-5 shadow-lg">
                <div className="bg-slate-300 rounded-full p-4">
                    <img src={images ? images[0].url : ''} alt="Description" className="rounded-full w-80 h-80" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-4xl font-bold">{name}</h2>
                    <p className="text-lg text-black">{dateFormatterAgo(created_at)}</p>
                    <p className="text-2xl mt-4">₱ {price}</p>
                    <div className="flex gap-4 mt-5">
                        <button onClick={() => setQuantity((prev) => prev + 1)} className="text-6xl">+</button>
                        <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="text-6xl">−</button>
                    </div>
                    <div className="flex items-center justify-center w-12 h-10 bg-white rounded-md text-3xl">{quantity}</div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="bg-transparent border-2 border-red-600 rounded-full py-2 px-6 text-xl font-bold text-red-600 hover:bg-red-600 hover:text-white">
                            Buy
                        </button>
                        {/* Action Icons */}
                        <button
                            aria-label="Add to Favorites"
                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3A5.5 5.5 0 0121 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <button
                            aria-label="Add to Cart"
                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                            onClick={handleAddToCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.5 9H5.25L4.5 6H3zM16.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )

};

export default FeaturedProductComp;
