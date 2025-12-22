"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCart } from "@/api/cart/requests";

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: CartProduct | null;
  quantity: number;
}

interface CartData {
  products: CartItem[];
  totalPrice: number;
}

interface CartContextType {
  cart: CartData | null;
  cartCount: number;
  updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  cartCount: 0,
  updateCartCount: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
      if (cartData && cartData.products) {
        const totalItems = cartData.products.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0
        );
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCart(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
