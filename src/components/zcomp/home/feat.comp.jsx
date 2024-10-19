import React, { useState } from "react";
import { useAddToCartBackend } from "../../../backend/cart.backend";
import { useNavigate } from "react-router-dom";


const FeaturedProductComp = ({ id, name, price, created_at, images }) => {
    const [quantity, setQuantity] = useState(0);
    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
    const navigate = useNavigate();
    const { response, loading, error: errorAddCart, addToCart } = useAddToCartBackend();

    const handleAddToCart = async () => {
        if (quantity === 0) {
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
                    <p className="text-lg text-black">{created_at}</p>
                    <p className="text-2xl mt-4">₱ {price}</p>
                    <div className="flex gap-4 mt-5">
                        <button onClick={() => setQuantity((prev) => prev + 1)} className="text-6xl">+</button>
                        <button onClick={() => setQuantity((prev) => Math.max(0, prev - 1))} className="text-6xl">−</button>
                    </div>
                    <div className="flex items-center justify-center w-12 h-10 bg-white rounded-md text-3xl">{quantity}</div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="bg-red-100 rounded-full py-2 px-6 text-xl font-bold">Buy</button>
                        {/* Action Icons */}
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf3108e8fc4cf36951d87816e360aad56e4bc090bfaf17d95bc6bef752ad2267?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2" alt="Favorite" className="w-11 h-11" />
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/88df987f1cb46a0ecae13f7603ffb6312c413e5e6867aba5e10b877393ae02f5?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2" alt="Cart" onClick={handleAddToCart} className="w-11 h-11" />
                    </div>
                </div>
            </section>
        </section>
    )

};

export default FeaturedProductComp;
