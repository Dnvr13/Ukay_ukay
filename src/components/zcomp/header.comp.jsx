import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComp = () => {
  const nav = useNavigate()

  const toCart =()=>{
    nav("/cart")
  }

  const toProf =()=>{
    nav('/profile')
  }


  return (
    <header className="bg-white flex flex-col md:flex-row items-center justify-between p-5 md:p-6 lg:p-8 shadow-sm">
      {/* Logo */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6d0a7a6f1e9238ee939c4890c892dfaf179c0c3228dd98cc1712dad2439eb75?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
        alt="Ukay-Ukay Online Shop Logo"
        className="aspect-ratio[1.02] object-contain w-[172px] rounded-full max-w-full mb-4 md:mb-0"
      />
      
      {/* Navigation */}
      <nav className="flex items-center gap-10 text-black text-xl md:gap-8 mb-4 md:mb-0">
        <a href="/" className="no-underline hover:underline">Home</a>
        <div className="flex flex-col items-center">
          <a href="/items" className="no-underline hover:underline">Items</a>
          <div className="bg-black h-[2px] w-full mt-2" />
        </div>
        <a href="/favorites" className="no-underline hover:underline">Favorites</a>
        <button className="bg-none border-none cursor-pointer p-0" aria-label="Notifications">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0184b8cae3527568127b7e97a0144a16299b34746c0072e4f70631560363ead8?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt=""
            className="w-[42px] aspect-ratio[1] object-contain shadow-lg"
          onClick={toCart}/>
        </button>
        <button className="bg-none border-none cursor-pointer p-0" aria-label="User Profile">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b067702305adfd602a0b6f1791cdcc451ae43eb4211b5b1a467b0d4a74d7784?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt=""
            onClick={toProf}
            className="w-[42px] aspect-ratio[1] object-contain shadow-lg"
          />
        </button>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-xl p-2 w-full max-w-[441px] shadow-lg">
        <label htmlFor="searchInput" className="sr-only">Search</label>
        <input
          type="search"
          id="searchInput"
          placeholder="Search here"
          className="flex-grow border-none text-base font-sans bg-transparent placeholder-black"
        />
        <button type="submit" className="bg-none border-none cursor-pointer p-0" aria-label="Search">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc278ee9417268e666bdd5c83a565a3a9025f4edddb59cf14a62d0e4ac199f9d?placeholderIfAbsent=true&apiKey=63cef383af9641cc969e43f7e6acc6c2"
            alt=""
            className="w-[26px] aspect-ratio[0.81] object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default HeaderComp;