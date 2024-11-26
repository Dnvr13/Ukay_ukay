import React, { useState } from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import { useCartBackend, useCartCheckoutBackend, useCartRemoveBackend, useUpdateCustCart } from "../backend/cart.backend";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();

    const { cartItems, loading, error, refreshCart } = useCartBackend();
    const { loading: loadingCheckout, error: errorCheckout, checkout, checkoutFunctionDB } = useCartCheckoutBackend();
    const { loading: loadingRemoveItem, error: errorRemoveItem, cartRemove } = useCartRemoveBackend();
    const { updateCustCart } = useUpdateCustCart();
    const [paymentMode,setPaymentMode] = useState({
        mode:''
    });

    let toastDisplayed = false;
    let totalPrice = 0;

    const handleCartCheckout = async () => {
        if(paymentMode.mode !== ''){
            await checkoutFunctionDB(paymentMode.mode);
        }else{
            toast.error("Selet payment method!");
        }
    };
    
    const handlePaymode =(e)=>{
        const { name, value } = e.target;
        setPaymentMode({ ...paymentMode, [name]: value })
    }

    
    const handleRemoveAction = async (isProceed, itemId) => {
        if (isProceed) {
            await cartRemove(itemId);
        }
        toastDisplayed = false;
    };


    const handleRemoveCartItem = (e) => {
        const itemId = e.currentTarget.dataset.id;
        if (!toastDisplayed) {
            toastDisplayed = true;

            toast.warning("Remove cart item 😞", {
                classNames: {
                    toast: "flex-col items-start",
                    actionButton: "w-full justify-center !bg-rose-500 group-[.toast]:!text-white",
                    cancelButton: "w-full justify-center !bg-sky-500 group-[.toast]:!text-white",
                },
                description: "Are you sure you want to remove the item? This cannot be undone.",
                action: {
                    label: "Cancel",
                    onClick: () => handleRemoveAction(false, itemId),
                },
                cancel: {
                    label: "Yes",
                    onClick: () => handleRemoveAction(true, itemId),
                },
                duration: Infinity,
                onDismiss: () => {
                    toastDisplayed = false; // Reset the flag when the toast is dismissed
                }
            });
        }
    };

    const [quantities, setQuantities] = useState({}); // Store quantities for each item
    const [showQuantityChanger, setShowQuantityChanger] = useState({}); // Control visibility of quantity changer

    const handleQuantityChange = (itemId, change) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 1) + change, 1) // Ensure minimum quantity is 1
        }));
    };

    const applyQuantityChange = async (itemId) => {
        const newQuantity = quantities[itemId];
        if (newQuantity && newQuantity > 0) {
            console.log(`Updated ${itemId} to quantity ${newQuantity}`);
            await updateCustCart(itemId, newQuantity)
            refreshCart();
            setQuantities((prev) => ({ ...prev, [itemId]: undefined }));
            setShowQuantityChanger((prev) => ({ ...prev, [itemId]: false }));

        }
    };

    const navToProductDetail = (product) => {
        if (product.inventory_images) {
            product.images = product.inventory_images;
            delete product.inventory_images
        }
        navigate('/product', { state: product })
    }

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComp />
            <main className="flex-grow p-5 md:p-10 flex">


                <div className="w-full md:w-2/3 pr-4">
                    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center">
                                <svg className="w-16 h-16 text-gray-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    <path d="M10 5a1 1 0 00-.707.293L6.586 8H7a1 1 0 100-2h-.586l2.121-2.121A1 1 0 0010 5z" />
                                </svg>
                                <h3 className="text-lg font-semibold mb-2">Your cart is empty!</h3>
                                <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet.</p>
                                <p className="text-gray-600">Start shopping now and fill your cart with amazing products!</p>
                                <button
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    onClick={() => navigate('/items')}>
                                    Go to Shop
                                </button>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex justify-between border-b py-2 relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md cursor-pointer"
                                        onClick={() => navToProductDetail(item.inventory)}
                                    />

                                    <div className="flex-grow mx-2">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-700">₱{item.price}</p>
                                        <p className="text-gray-700">Qty: x{item.quantity}</p>

                                        {/* Button to toggle quantity changer */}
                                        <button
                                            onClick={() => setShowQuantityChanger((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                                            className="bg-blue-500 text-white rounded-md mt-2 px-3"
                                        >
                                            {showQuantityChanger[item.id] ? "Close" : "Change Quantity"}
                                        </button>

                                        {/* Quantity Changer */}
                                        {showQuantityChanger[item.id] && (
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)} // Decrement
                                                    className="bg-gray-200 rounded-l-md px-2"
                                                    disabled={(quantities[item.id] || item.quantity) <= 1} // Disable if quantity is at minimum
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantities[item.id] || item.quantity} // Controlled component
                                                    className="border-t border-b text-center w-16 mx-1"
                                                    readOnly // Prevent manual typing
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)} // Increment
                                                    className="bg-gray-200 rounded-r-md px-2"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => applyQuantityChange(item.id)} // Apply changes
                                                    className="bg-green-500 text-white rounded-md ml-2 px-3"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                    <p className="text-gray-700">₱{item.total_price}</p>

                                    <button
                                        className="absolute bottom-1 right-1 text-gray-500 hover:text-red-500"
                                        data-id={item.id}
                                        onClick={handleRemoveCartItem}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/3 pl-4">
                    <h2 className="text-2xl font-bold mb-4">Checkout Summary</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <ul className="mb-4">
                            {
                            cartItems.length === 0?
                            <h1 className="">No items</h1>:  
                            cartItems.map(item => (
                                <li key={item.id} className="flex justify-between mb-2" data-price={totalPrice +=item.total_price}>
                                    <span>{item.name}</span>
                                    <span>₱{(item.total_price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative w-full my-2">

                            <select name="mode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={paymentMode.mode} onChange={handlePaymode} required>
                                <option value="" >Payment Method</option>
                                <option value="cod" >Cash on Delivery</option>
                                <option value="gcash">G-Cash</option>
                                <option value="cash">Cash</option>
                            </select>

                        </div>
                        <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>₱{totalPrice}</span>
                        </div>

                        {/* Checkout Button */}
                        <button
                            type="button"
                            className={`w-full ${cartItems.length === 0 || loadingCheckout ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md  mt-4`}
                            onClick={handleCartCheckout}                
                            disabled={cartItems.length === 0 || loadingCheckout}
                        >
                            Checkout now
                        </button>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <FooterComp />
        </div>
    );
};

export default CartPage;