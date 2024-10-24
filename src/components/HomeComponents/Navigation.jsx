import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import styles from "./Navigation.module.css";

const Navigation = () => {
  const location = useLocation(); // Get the current location

  return (
    <nav className={styles.navigation}>
      <a href="/home" className={styles.navLink}>
        Home
        {location.pathname === "/home" && (
            <div className={styles.underline} /> // Show underline under Cart icon when active
          )}
      </a>
      <a href="/items" className={styles.navLink}>
        Items
      </a>
      <a href="/favorites" className={styles.navLink}>
        Favorites
      </a>

      {/* Cart Button with underline */}
      <Link to="/cart">
        <button className={styles.iconButton} aria-label="Cart">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0184b8cae3527568127b7e97a0144a16299b34746c0072e4f70631560363ead8?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Cart"
            className={styles.icon}
          />
          {location.pathname === "/cart" && (
            <div className={styles.underline} /> // Show underline under Cart icon when active
          )}
        </button>
      </Link>

      <Link to="/profile">
        <button className={styles.iconButton} aria-label="Profile">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b067702305adfd602a0b6f1791cdcc451ae43eb4211b5b1a467b0d4a74d7784?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt="Profile"
            className={styles.icon}
          />
          {location.pathname === "/profile" && (
            <div className={styles.underline} /> // Show underline under Profile icon when active
          )}
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;
