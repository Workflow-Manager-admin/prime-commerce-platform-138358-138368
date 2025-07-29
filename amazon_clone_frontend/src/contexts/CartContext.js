import React, { createContext, useReducer, useContext } from "react";

// PUBLIC_INTERFACE
const CartContext = createContext();

// Helper to get item index
const findItemIdx = (cart, productId) =>
  cart.findIndex((item) => item.id === productId);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      {
        const idx = findItemIdx(state, action.payload.id);
        if (idx !== -1) {
          // Increment existing
          const newCart = [...state];
          newCart[idx].quantity += action.payload.quantity || 1;
          return newCart;
        } else {
          return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
        }
      }
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * Provides cart management context (add/remove/update/clear).
 */
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // PUBLIC_INTERFACE
  const addToCart = (product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
  // PUBLIC_INTERFACE
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  // PUBLIC_INTERFACE
  const updateQty = (id, quantity) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  // PUBLIC_INTERFACE
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useCart() {
  return useContext(CartContext);
}
