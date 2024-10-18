import React from "react";
import styles from "./EmptyCart.module.css";
import useStore from "../store/zustandStore"; // Import Zustand store

function EmptyCart() {
  const favoriteItems = useStore((state) => state.favoriteItems); // Access favorite items from Zustand

  return (
    <section className={styles.emptyCart}>
      {favoriteItems.length === 0 ? (
        <>
          <h2 className={styles.title}>No Favorites yet!</h2>
          <p className={styles.description}>
            Your Shopping Favorites lives to serve.
            <br />
            Fill it with your favorites and make it happy!
          </p>
          <button className={styles.continueButton}>Continue Shopping</button>
        </>
      ) : (
        <>
          <h2 className={styles.title}>Your Favorites:</h2>
          <ul className={styles.itemList}>
            {favoriteItems.map((item, index) => (
              <li key={index} className={styles.item}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default EmptyCart;
