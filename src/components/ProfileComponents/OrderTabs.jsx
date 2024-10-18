/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./OrderTabs.module.css";

const OrderTabs = () => {
  const tabs = ["All", "To Deliver", "To Deliver", "Completed", "Cancelled"];

  return (
    <nav className={styles.orderTabs}>
      {tabs.map((tab, index) => (
        <button key={index} className={styles.tabButton}>
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default OrderTabs;