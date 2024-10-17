import React from "react";
import styles from "./LoadingComponent.module.css";

function LoadingComponent({ isFadingOut }) {
  return (
    <main className={`${styles.loadingContainer} ${isFadingOut ? styles.fadeOut : styles.fadeIn}`}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/73eb7e640bf1bb4dae7b1b61b83b6deb5516c1c960c52103442b8cfb2f60e9d6?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc"
        className={styles.loadingImage}
        alt="Loading indicator"
      />
    </main>
  );
}

export default LoadingComponent;
