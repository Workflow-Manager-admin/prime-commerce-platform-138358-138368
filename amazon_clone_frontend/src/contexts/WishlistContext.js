import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
const WishlistContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides wishlist management (add/remove).
 */
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useWishlist() {
  return useContext(WishlistContext);
}
