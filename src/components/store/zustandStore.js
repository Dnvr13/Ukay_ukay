import { create } from "zustand";

const useStore = create((set) => ({
  cartItems: [],
  favoriteItems: [],

  addToCart: (item) => set((state) => ({
    cartItems: [...state.cartItems, item],
  })),

  addToFavorites: (item) => set((state) => ({
    favoriteItems: [...state.favoriteItems, item],
  })),
}));

export default useStore;
