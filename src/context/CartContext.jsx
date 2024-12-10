import React, { createContext, useReducer, useContext, useEffect } from "react";

// Create the cart context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        totalQuantity: state.totalQuantity + action.payload.quantity,
        totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
      };

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const removedItem = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: filteredItems,
        totalQuantity: state.totalQuantity - removedItem.quantity,
        totalPrice: state.totalPrice - removedItem.price * removedItem.quantity,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // Load initial state from localStorage if available
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initial;
  });

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
