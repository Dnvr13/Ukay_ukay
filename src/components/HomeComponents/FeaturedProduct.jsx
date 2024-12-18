/**
 * This code was generated by Builder.io.
 */
import React, { useState } from "react";
import styles from "./FeaturedProduct.module.css";

const FeaturedProduct = ({ name, price, created_at, images }) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

  return (
    <section className={styles.featuredProduct}>
      <div className="bg-slate-300 rounded-full p-4">
        <img src={images?images[0].url:''} alt="Description" className="rounded-full" width={350} height={350} />
      </div>
      <div className={styles.productDetails}>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.productDate}>{created_at}</p>
        <p className={styles.productDescription}>₱ {price}</p>
        <div className={styles.quantityControl}>
          <button onClick={incrementQuantity} className={styles.quantityButton}>
            +
          </button>
          <button onClick={decrementQuantity} className={styles.quantityButton}>
            -
          </button>
        </div>
        <div className={styles.quantityDisplay}>{quantity}</div>
        <div className={styles.actionButtons}>
          <button className={styles.buyButton}>Buy</button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf3108e8fc4cf36951d87816e360aad56e4bc090bfaf17d95bc6bef752ad2267?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Favorite"
            className={styles.actionIcon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/88df987f1cb46a0ecae13f7603ffb6312c413e5e6867aba5e10b877393ae02f5?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Share"
            className={styles.actionIcon}
          />
        </div>
      </div>
      <aside className={styles.additionalImages}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c640ff0becb6e3b52bd906034504bca5e73b9654acf9077596da294497529d32?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
          alt="Additional product view 1"
          className={styles.thumbnailImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e07868fd5393434019dc5ca040f307c54d01ccc40ba74abe5df19de222bf3c3?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
          alt="Additional product view 2"
          className={styles.thumbnailImage}
        />
      </aside>
    </section>
  );
};

export default FeaturedProduct;
