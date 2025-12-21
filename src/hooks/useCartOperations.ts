"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  getCart,
  deleteCartItem,
  updateCartQuantity,
  clearCart,
} from "@/api/cart/requests";
import { useCart } from "@/context/CartContext";
import { CartData } from "@/types/cart";

export const useCartOperations = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateCartCount } = useCart();

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartData(data);
    } catch (err) {
      setError("Failed to load cart");
      console.error("Error fetching cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await updateCartQuantity(productId, newQuantity);
      const updatedCart = await getCart();
      setCartData(updatedCart);
      await updateCartCount();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error ? error.message : "Failed to update quantity",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    }
  };

  const handleDeleteItem = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteCartItem(productId);
        const updatedCart = await getCart();
        setCartData(updatedCart);
        await updateCartCount();
        Swal.fire({
          title: "Deleted!",
          text: "Item has been removed.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete item",
          icon: "error",
          background: "#0a0a0a",
          color: "#fff",
        });
      }
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Clear entire cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, clear it!",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await clearCart();
        setCartData({ products: [], totalPrice: 0 });
        await updateCartCount();
        Swal.fire({
          title: "Cleared!",
          text: "Your cart has been cleared.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to clear cart",
          icon: "error",
          background: "#0a0a0a",
          color: "#fff",
        });
      }
    }
  };

  return {
    cartData,
    isLoading,
    error,
    fetchCart,
    handleQuantityUpdate,
    handleDeleteItem,
    handleClearCart,
    setCartData,
    setIsLoading,
    setError,
  };
};
