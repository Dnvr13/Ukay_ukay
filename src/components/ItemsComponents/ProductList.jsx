import React from "react";
import styles from "../ItemsComponents/ProductList.module.css";
import CategorySidebar from "../ItemsComponents/CategorySidebar";
import ProductGrid from "../ItemsComponents/ProductGrid";

const ProductList = () => {
  return (
    <main className={styles.productList}>
      <CategorySidebar />
      <ProductGrid />
    </main>
  );
};

export default ProductList;