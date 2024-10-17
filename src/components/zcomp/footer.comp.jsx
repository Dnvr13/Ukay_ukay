import React from "react";

const FooterComp = () => {
  return (
    <footer className="bg-white py-6">
      <div className="max-w-screen-xl mx-auto px-5 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h4 className="font-bold mb-2">More about Ukay-Ukay Online Shop</h4>
          <p className="text-xs mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
            ab ullam, numquam nesciunt in.
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/71e828df22a7fdad6038c627af535ade8bce231696dd838a56f0b34849ba08e6?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
                alt=""
                className="w-5 h-5 object-contain"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c857072da06ba33f44d251c511f35568f4952752ed3709ab7f50c9fd130906aa?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
                alt=""
                className="w-5 h-5 object-contain"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/213f392f3f3de091c2116c4731e52086e5a0e5a73817616e323100262ebcf8e3?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
                alt=""
                className="w-5 h-5 object-contain"
              />
            </a>
          </div>
        </div>
        <div className="flex items-end md:flex-col md:items-start">
          <div className="mr-5 md:mr-0 mb-4 md:mb-0">
            <h4 className="text-sm font-bold">Gcash</h4>
            <p className="text-xs font-light">123456789101112</p>
          </div>
          <div className="bg-white rounded-full p-5 text-3xl font-light">QR</div>
        </div>
      </div>
      <div className="text-center text-sm font-light mt-5 pt-3 border-t border-black">
        © 2024 | Gulmatico 2nd Hand Clothing Store | All Rights Reserved |
        Powered by [YourWebDevCompanyName].com
      </div>
    </footer>
  );
};

export default FooterComp;