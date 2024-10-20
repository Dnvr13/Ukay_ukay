import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import Header from "./Header";
import EmptyCart from "./EmptyCart";
import Footer from "./Footer";
import useStore from "../store/zustandStore";
import { useCartBackend, useCartCheckoutBackend } from "../../backend/cart.backend";
import { useIsAdminUtil } from "../utilities";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([])
  const { cartItems, loading, error } = useCartBackend()
  const {response,loading:loadingCheckout,error:errorCheckout,checkout} = useCartCheckoutBackend();

  const { isAdmin } = useIsAdminUtil();
  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin) {
      nav('/admin')
    }
  },[isAdmin,nav])

  const handleCartCheckout = async()=>{
    await checkout(cartItems);
    console.log(loadingCheckout)
    console.log(errorCheckout)
  }

  return (
    <main className={styles.cart}>
      <Header />
      <section className={styles.cartContent}>
        <div className={styles.cartLayout}>
          <div className={styles.imageColumn}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/561c62489c7f15fa2d276c46181026fafa1a5f799999be7269bed826c7cffdc5?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
              alt="Cart illustration"
              className={styles.cartImage}
            />
          </div>
          <div className={styles.contentColumn}>
            {cartItems.length === 0 || loading || error ? (
              <EmptyCart /> // If cart is empty, show EmptyCart component
            ) : (
              <ul className="bg-slate-300 shadow-md rounded-md p-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex items-center bg-white rounded-lg p-3 mb-2 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-700">{item.price}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </li>
                ))}
                 <button className={`bg-orange-500 text-white font-medium p-3 ${loadingCheckout?'hidden':''}`} onClick={handleCartCheckout}>Checkout</button>
              </ul>
            )}
          </div>          
        </div>
      </section>    
      <Footer />
    </main>
  );
}

export default Cart;
