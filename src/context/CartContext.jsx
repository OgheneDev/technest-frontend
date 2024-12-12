import React, { createContext, useReducer, useContext, useEffect } from "react";

// Create the cart context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [], // Array of cart items
  totalQuantity: 0, // Total number of items in the cart
  totalPrice: 0, // Total cost of items in the cart
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        updatedItems[existingItemIndex] = updatedItem;

        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice: calculateTotalPrice(updatedItems),
        };
      }

      // If the item does not exist, add it to the cart
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity + action.payload.quantity,
        totalPrice: calculateTotalPrice(newItems),
      };
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: filteredItems,
        totalQuantity: calculateTotalQuantity(filteredItems),
        totalPrice: calculateTotalPrice(filteredItems),
      };
    }

    case 'INCREMENT_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        totalQuantity: calculateTotalQuantity(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case 'DECREMENT_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        totalQuantity: calculateTotalQuantity(updatedItems),
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Helper functions to calculate totals
const calculateTotalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// CartProvider component
export const CartProvider = ({ children }) => {
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