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
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice:
            state.totalPrice +
            action.payload.quantity * action.payload.price,
        };
      }

      // If the item does not exist, add it to the cart
      return {
        ...state,
        items: [...state.items, action.payload],
        totalQuantity: state.totalQuantity + action.payload.quantity,
        totalPrice:
          state.totalPrice + action.payload.quantity * action.payload.price,
      };

    case "REMOVE_ITEM":
      const removedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!removedItem) return state; // If item is not found, return current state

      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: filteredItems,
        totalQuantity: state.totalQuantity - removedItem.quantity,
        totalPrice:
          state.totalPrice -
          removedItem.quantity * removedItem.price,
      };

      case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Prevent quantity from going below 1
            : item
        ),
      };

    case "CLEAR_CART":
      return initialState; // Reset the cart to the initial state

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
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
