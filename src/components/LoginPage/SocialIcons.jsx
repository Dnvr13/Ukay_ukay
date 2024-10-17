import React from "react";
import styles from './LoginForm.module.css';

function SocialIcons() {
  const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ddcabaf085dc82f7949288e4b205d4c5dd0c053465c09a057d2d3e36888d87e2?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc", alt: "Social media icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eacd49761d55fc4a49f78d5d237a590a541c7bd6c4d5e83ca1ffc7ab478f472?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc", alt: "Social media icon 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d864832345764f07538abafc2888836430440b87f9ce00f237d2272e1cda7380?placeholderIfAbsent=true&apiKey=e6e279f9e06842139b3f7c01a7502bdc", alt: "Social media icon 3" }
  ];

  return (
    <div className={styles.socialIcons}>
      {socialIcons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className={styles.socialIcon}
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default SocialIcons;