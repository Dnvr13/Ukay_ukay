/**
 * This code was generated by Builder.io.
 */
import React, { useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FeaturedProduct from "./FeaturedProduct";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import styles from "./Home.module.css";
import { useProductsBackend } from "../../backend/inventory.backend";
import { useIsAdminUtil } from "../utilities";
import { useNavigate } from "react-router-dom";

const UkayUkayOnlineShop = () => {
  const { isAdmin } = useIsAdminUtil();
  const nav = useNavigate();
  const { products, loading, error } = useProductsBackend();

  const featProduct = products[Math.floor(Math.random() * (products.length - 0))]

  useEffect(() => {
    if (isAdmin) {
      nav('/admin')
    }
  },[isAdmin,nav])

  return (
    <div className={styles.ukayUkayOnlineShop}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.limitedSection}>
          <h2 className={styles.sectionTitle}>Limited Ukay-Ukay</h2>
          <FeaturedProduct {...featProduct} />
        </section>
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default UkayUkayOnlineShop;
