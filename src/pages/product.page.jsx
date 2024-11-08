import React, { useEffect, useState } from 'react';
import HeaderComp from '../components/zcomp/header.comp';
import FooterComp from '../components/zcomp/footer.comp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddToCartBackend } from '../backend/cart.backend';
import { useAddToFavoritesBackend } from '../backend/favorites.backend';

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { id, name, description, price, quantity,images } = location.state || {};
    const { loading: loadingCart, error: errorCart, addToCart } = useAddToCartBackend();
    const { loading: loadingFav, error: errorFav, addToFavorites } = useAddToFavoritesBackend();
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Redirect if no product data is found
    useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location.state, navigate]);

    // Image navigation handlers
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Add to cart handler
    const handleAddToCart = async () => {
        await addToCart(id, 1);
        if (errorCart?.includes('login')) {
            navigate('/login');
        }
    };

    // Add to favorites handler
    const handleAddToFavorites = async () => {
        await addToFavorites(id);
        if (errorFav?.includes('login')) {
            navigate('/login');
        }
    };

    // Render image carousel
    const renderImageCarousel = () => (
        <div className="relative w-full md:w-1/2">
            <div className="w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[currentImageIndex]?.url || "not set"}
                    alt={name || "Product Image"}
                    className="w-full h-full transition-transform duration-300 ease-in-out"
                />
            </div>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                <button onClick={handlePrevImage} className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition">
                    &#10094; {/* Left Arrow */}
                </button>
                <button onClick={handleNextImage} className="bg-white rounded-full p-2 shadow hover:bg-gray-200 transition">
                    &#10095; {/* Right Arrow */}
                </button>
            </div>
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 mx-1 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );

    // Render product details
    const renderProductDetails = () => (
        <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-center">
            <h1 className="text-2xl font-bold">{name || "not set"}</h1>
            <p className="text-xl text-green-600 mt-2">₱{price || "0"}</p>
            <p className="text-xl text-stone-800 mt-2">Qty Left: {quantity || "0"} </p>
            <h2 className="text-lg font-semibold mt-6">Description:</h2>
            <p className="mt-4">{description || "not set"}</p>
            <div className="mt-6 flex space-x-4">
                <button 
                    className={`${loadingFav ? "bg-slate-400" : "bg-amber-500"} text-white py-2 px-4 rounded hover:bg-amber-600 transition`}
                    onClick={handleAddToFavorites}
                    disabled={loadingFav}
                >
                    Add to Favorites
                </button>
                <button 
                    className={`${loadingCart ? "bg-slate-400" : "bg-blue-500"} text-white py-2 px-4 rounded hover:bg-blue-600 transition`}
                    onClick={handleAddToCart}
                    disabled={loadingCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComp />
            <main className="flex-grow flex md:flex-row p-5 md:p-10">
                {images && images.length > 0 ? renderImageCarousel() : <p>No images available</p>}
                {renderProductDetails()}
            </main>
            <FooterComp />
        </div>
    );
};

export default ProductDetailPage;