/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.aboutSection}>
          <h3 className={styles.aboutTitle}>
            More about Ukay-Ukay Online Shop
          </h3>
          <p className={styles.aboutDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
            ab ullam, numquam nesciunt in.
          </p>
          <div className={styles.socialIcons}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a64b4724a3d50fd98e3af3a21e2707f4f98d72b0ce53045c53b044c64c2263e?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
              alt="Facebook"
              className={styles.socialIcon}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9cebe5b1127cfe7af172036171be11257cca6d5e5999c29bb2f7f4c4fb7c80f?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
              alt="Twitter"
              className={styles.socialIcon}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e6a8df703e1c966dea885325c26315024d591fbc27476eba91328117396a917?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
              alt="Instagram"
              className={styles.socialIcon}
            />
          </div>
        </div>
        <div className={styles.paymentSection}>
          <div className={styles.gcashInfo}>
            <h4 className={styles.gcashTitle}>Gcash</h4>
            <p className={styles.gcashNumber}>123456789101112</p>
          </div>
          <div className={styles.qrCode}>QR</div>
        </div>
      </div>
      <p className={styles.copyright}>
        © 2024 | Gulmatico 2nd Hand Clothing Store | All Rights Reserved |
        Powered by [YourWebDevCompanyName].com
      </p>
    </footer>
  );
};

export default Footer;
