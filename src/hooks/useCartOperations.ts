"use client";

import { useState } from "react";
import {
  getCart,
  deleteCartItem,
  updateCartQuantity,
  clearCart,
} from "@/api/cart/requests";
import { useCart } from "@/context/CartContext";
import { CartData } from "@/types/cart";
import { useToastStore } from "@/store/useToastStore";

export const useCartOperations = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateCartCount } = useCart();
  const { showToast } = useToastStore();

  // Confirmation modal state (matching useCheckoutOperations pattern)
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

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
      showToast(
        error instanceof Error ? error.message : "Failed to update quantity",
        "error"
      );
    }
  };

  const handleDeleteItem = (productId: string) => {
    setConfirmationModal({
      isOpen: true,
      title: "Delete Item?",
      message:
        "Are you sure you want to remove this item from your cart? This action cannot be undone.",
      variant: "warning",
      onConfirm: async () => {
        try {
          await deleteCartItem(productId);
          const updatedCart = await getCart();
          setCartData(updatedCart);
          await updateCartCount();
          showToast("Item has been removed.", "success");
        } catch (error) {
          showToast("Failed to delete item", "error");
        } finally {
          closeConfirmationModal();
        }
      },
    });
  };

  const handleClearCart = () => {
    setConfirmationModal({
      isOpen: true,
      title: "Clear Cart?",
      message:
        "Are you sure you want to clear your entire cart? All items will be removed and this action cannot be undone.",
      variant: "warning",
      onConfirm: async () => {
        try {
          await clearCart();
          setCartData({ products: [], totalPrice: 0 });
          await updateCartCount();
          showToast("Your cart has been cleared.", "success");
        } catch (error) {
          showToast("Failed to clear cart", "error");
        } finally {
          closeConfirmationModal();
        }
      },
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
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
    confirmationModal,
    closeConfirmationModal,
  };
};
