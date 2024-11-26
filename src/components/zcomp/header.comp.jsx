import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderComp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to check if the current path matches the button's path
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-800 flex flex-col md:flex-row items-center justify-between p-5 md:p-6 lg:p-8 shadow-sm text-white">
      {/* Logo */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6d0a7a6f1e9238ee939c4890c892dfaf179c0c3228dd98cc1712dad2439eb75?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
        alt="Ukay-Ukay Online Shop Logo"
        className="aspect-ratio[1.02] object-contain w-[172px] rounded-full max-w-full mb-4 md:mb-0 cursor-pointer"
        onClick={() => handleNavigation("/")}
      />

      {/* Navigation */}
      <nav className="flex items-center gap-10 text-xl md:gap-8 mb-4 md:mb-0">
        <button
          onClick={() => handleNavigation("/")}
          className={`no-underline ${
            isActive("/") || isActive("/home") ? "font-bold border-b-2 border-light-blue-500 text-light-blue-400" : ""
          } hover:underline`}
        >
          Home
        </button>
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleNavigation("/items")}
            className={`no-underline ${
              isActive("/items") ? "font-bold border-b-2 border-light-blue-500 text-light-blue-400" : ""
            } hover:underline`}
          >
            Items
          </button>
        </div>
        <button
          onClick={() => handleNavigation("/favorites")}
          className={`no-underline ${
            isActive("/favorites") ? "font-bold border-b-2 border-light-blue-500 text-light-blue-400" : ""
          } hover:underline`}
        >
          Favorites
        </button>
        <button
          onClick={() => handleNavigation("/cart")}
          className="bg-none border-none cursor-pointer p-0"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-8 h-8 ${isActive("/cart") && "font-bold border-b-2 border-light-blue-500 text-light-blue-400"}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.5 9H5.25L4.5 6H3zM16.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </button>
        <button
          onClick={() => handleNavigation("/profile")}
          className="bg-none border-none cursor-pointer p-0"
          aria-label="User Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`w-8 h-8 ${isActive("/profile") && "font-bold border-b-2 border-light-blue-500 text-light-blue-400"}`}
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </button>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 rounded-xl p-2 w-full max-w-[441px] shadow-lg">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="searchInput"
          placeholder="Search here"
          className="flex-grow border-none text-base font-sans bg-transparent placeholder-white text-white"
        />
        <button type="submit" className="bg-none border-none cursor-pointer p-0" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-[26px] aspect-ratio[0.81] object-contain"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderComp;
