/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./ProductCard.module.css";
import { addToCartBackend } from "../../backend/cart.backend";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id,name, price, images }) => {
  const navigate = useNavigate();

  const handleAddToCart = async ()=>{
    const data = await addToCartBackend(id,1)

    if(!data.success){
      const x = data.message;
      if(x.includes('login')){
        navigate('/login')
      }
      console.error(x);
    }

  }

  return (
    <article className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={images[0].url} alt={name} className={styles.productImage} />
        <div className={styles.iconContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b534bed50392e7abd0b6b3cf183230c606d44f07501b1a2aceaa352bae29ec39?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Favorite"
            className={styles.icon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93964d5116e9e36c04417dbf5d1bd6cfe839f8720d48900fe9c35ca4956c37c?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Cart"
            className={styles.icon}
            onClick={handleAddToCart}
          />
        </div>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>₱ {price.toFixed(2)}</p>
      </div>
      <button className={styles.buyButton}>Buy</button>
    </article>
  );
};

export default ProductCard;
