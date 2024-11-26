import React from "react";

// Social Media Links Component
const SocialMediaLinks = () => {
  const socialLinks = [
    {
      href: "#",
      ariaLabel: "Facebook",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/71e828df22a7fdad6038c627af535ade8bce231696dd838a56f0b34849ba08e6?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2",
    },
    {
      href: "#",
      ariaLabel: "Twitter",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c857072da06ba33f44d251c511f35568f4952752ed3709ab7f50c9fd130906aa?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2",
    },
    {
      href: "_blank instag",
      ariaLabel: "Instagram",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/213f392f3f3de091c2116c4731e52086e5a0e5a73817616e323100262ebcf8e3?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2",
    },
  ];

  return (
    <div className="flex gap-3">
      {socialLinks.map(({ href, ariaLabel, imgSrc }) => (
        <a key={ariaLabel} href={href} aria-label={ariaLabel}>
          <img src={imgSrc} alt={ariaLabel} className="w-5 h-5 object-contain" />
        </a>
      ))}
    </div>
  );
};

// Main Footer Component
const FooterComp = () => {
  return (
    <footer className="bg-gray-800 py-6 text-white">
      <div className="max-w-screen-xl mx-auto px-5 flex flex-col md:flex-row justify-between">
        {/* About Section */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h4 className="font-bold mb-2">Ukay-Ukay Online Shop</h4>
          <p className="text-xs mb-4">
            Ukay-ukay online shops have gained popularity as a sustainable and affordable way to shop for secondhand clothing, appealing to both budget-conscious consumers and those looking to reduce their environmental impact. These platforms allow shoppers to conveniently browse and purchase unique fashion finds from the comfort of their homes, making thrifting more accessible than ever before.
          </p>
          <SocialMediaLinks />
        </div>

        {/* Payment Information Section */}
        <div className="flex items-end md:flex-col md:items-start">
          <div className="mr-5 md:mr-0 mb-4 md:mb-0">
            <h4 className="text-sm font-bold">Gcash</h4>
            <p className="text-xs font-light">+639501127321</p>
          </div>
          <div className="bg-gray-700 rounded-full p-5 text-3xl font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code w-32 h-32 text-white" viewBox="0 0 16 16"> 
              <path d="M2 2h2v2H2V2Z" /> 
              <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" /> 
              <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" /> 
              <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z" /> 
              <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" /> 
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-sm font-light mt-5 pt-3 border-t border-gray-600">
        Â© 2024 | Gulmatico 2nd Hand Clothing Store | All Rights Reserved | Powered by [Ukay-ukay.vercel].app
      </div>
    </footer>
  );
};

export default FooterComp;