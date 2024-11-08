import React, { useState } from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";
import { useCartBackend, useCartCheckoutBackend, useCartRemoveBackend, useUpdateCustCart } from "../backend/cart.backend";
import { toast } from "sonner";

const CartPage = () => {
    const { cartItems, loading, error, refreshCart } = useCartBackend();
    const { loading: loadingCheckout, error: errorCheckout, checkout } = useCartCheckoutBackend();
    const { loading: loadingRemoveItem, error: errorRemoveItem, cartRemove } = useCartRemoveBackend();
    const { updateCustCart } = useUpdateCustCart();

    let toastDisplayed = false;

    const handleCartCheckout = async () => {
        await checkout(cartItems);
        console.log(loadingCheckout);
        console.log(errorCheckout);
    };

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

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComp />
            <main className="flex-grow p-5 md:p-10 flex">
                <ul className="w-full">
                    <h1 className="text-3xl font-medium my-4 text-start">Your Cart</h1>

                    {/* Empty Cart Message */}
                    {cartItems.length === 0 || loading || error ? (
                        <div className="flex flex-col items-center justify-center h-3/4 bg-gray-100">
                            <svg className="w-16 h-16 text-gray-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                <path d="M10 5a1 1 0 00-.707.293L6.586 8H7a1 1 0 100-2h-.586l2.121-2.121A1 1 0 0010 5z" />
                            </svg>
                            <h2 className="text-xl font-semibold text-gray-700">Your Cart is Empty</h2>
                            <p className="text-gray-500">To get started, simply add some items to your cart!</p>
                        </div>
                    ) : null}

                    {cartItems.map((item) => (
                        <li key={item.id} className="flex items-center bg-white rounded-lg p-3 mb-2 shadow-md hover:shadow-lg relative w-2/4">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-700">₱{item.price}</p>
                                <p className="text-gray-700">Qty: x{item.quantity}</p>
                                <p className="text-gray-700">Total: ₱{item.total_price}</p>

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
                            <button
                                className={`absolute top-1 right-1 text-gray-500 hover:text-red-500`}
                                data-id={item.id}
                                onClick={handleRemoveCartItem}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </li>
                    ))}

                    <button
                        className={`bg-orange-500 rounded-md text-white font-medium p-3 ${loadingCheckout || cartItems.length ===
                            error ? 'hidden' : ''}`}
                        onClick={handleCartCheckout}
                    >
                        Checkout
                    </button>
                </ul>
            </main>
            {/* Footer */}
            <FooterComp />
        </div>
    );
};

export default CartPage;