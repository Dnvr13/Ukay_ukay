import React, { useEffect } from "react";
import Header from "./Header";
import ProductList from "./ProductList";  // Ensure this is correctly imported
import Footer from "./Footer";
import styles from "./App.module.css";
import { useIsAdminUtil } from "../utilities";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const { isAdmin } = useIsAdminUtil();
  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin) {
      nav('/admin')
    }
  },[isAdmin,nav])
  return (
    <div className={styles.app}>
      <Header />
      <ProductList />  {/* Your product list */}
      <Footer />
    </div>
  );
};

export default Items;
