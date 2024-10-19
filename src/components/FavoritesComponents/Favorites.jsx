import React, { useEffect } from "react";
import styles from "./Favorites.module.css"; // Adjust the path as needed
import Header from "./Header";
import EmptyCart from "./EmptyCart"; // This can be renamed to something like "EmptyFavorites" if needed
import Footer from "./Footer";
import useStore from "../store/zustandStore"; // Import Zustand store
import { useFavoritesBackend, useRemoveFavItemBackend } from "../../backend/favorites.backend";
import { useIsAdminUtil } from "../utilities";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const {isAdmin} = useIsAdminUtil();
  const nav = useNavigate();
  const favoriteItems = useStore((state) => state.favoriteItems);
  const { favItems, loading: fetchLoading, error: fetchError } = useFavoritesBackend()
  const {response,loading: removeLoading,error: removeError, removeFavItem}  = useRemoveFavItemBackend()

  const xx = async(e) => {
    const itemId = e.target.dataset.id
    await removeFavItem(itemId)
  }

  useEffect(()=>{
    if(isAdmin){
      nav('/admin')
    }
  })

  return (
    <main className={styles.favorites}>
      <Header />
      <section className={styles.favoritesContent}>
        <div className={styles.favoritesLayout}>
          <div className={styles.imageColumn}>
            {/* Optional: Add an illustration or empty state image */}
          </div>
          <div className={styles.contentColumn}>
            {favItems.length === 0 || fetchLoading || fetchError ? (
              <EmptyCart /> // Display EmptyCart component when there are no favorite items
            ) : (
              <ul className="shadow-md rounded-md p-4 m-2">
                <h1 className="text-3xl font-medium my-4">Your Favorites</h1>
                {favItems.map((item, index) => (
                  <li key={index} className="flex items-center bg-white rounded-lg p-3 mb-2 shadow-sm hover:shadow-lg relative">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-700">{item.price}</p>
                    </div>
                    <button className={`absolute top-1 right-1 text-gray-500 hover:text-red-500 ${removeLoading?"hidden":""}`} data-id={item.id} onClick={xx}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Favorites;
