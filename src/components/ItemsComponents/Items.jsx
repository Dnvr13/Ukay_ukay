import React from "react";
import Header from "./Header";
import ProductList from "./ProductList";  // Ensure this is correctly imported
import Footer from "./Footer";
import styles from "./App.module.css";

const Items = () => {
  return (
    <div className={styles.app}>
      <Header />
      <ProductList />  {/* Your product list */}
      <Footer />
    </div>
  );
};

export default Items;
