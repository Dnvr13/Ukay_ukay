import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}> {/* Wrapper for centering */}
      <form className={styles.searchBar}>
        <label htmlFor="searchInput" className="visually-hidden">
        </label>
        <input
          type="search"
          id="searchInput"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton} aria-label="Search">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc278ee9417268e666bdd5c83a565a3a9025f4edddb59cf14a62d0e4ac199f9d?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt=""
            className={styles.searchIcon}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
