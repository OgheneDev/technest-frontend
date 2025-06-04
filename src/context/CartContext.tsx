'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCart } from '@/api/cart/requests'

interface CartContextType {
  cartCount: number;
  updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({ 
  cartCount: 0,
  updateCartCount: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const cartData = await getCart();
      if (cartData && cartData.products) {
        const totalItems = cartData.products.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity, 
          0
        );
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
