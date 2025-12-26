"use client";

import { useState, useCallback } from "react";
import { getWishlist, removeFromWishlist } from "@/api/wishlist/requests";
import { addToCart } from "@/api/cart/requests";
import { useCart } from "@/context/CartContext";
import { useToastStore } from "@/store/useToastStore";
import { WishlistData } from "@/types/wishlist";

export const useWishlistOperations = () => {
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { showToast } = useToastStore();
  const { updateCartCount } = useCart();

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

  const closeConfirmationModal = () => {
    setConfirmationModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  const fetchWishlistData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getWishlist();
      if (data && data.products) {
        const validProducts = data.products.filter((item: any) => item.product);
        setWishlistData({ products: validProducts });
      } else {
        setWishlistData({ products: [] });
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistData({ products: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddToCart = async (productId: string, price: number) => {
    if (addingToCart) return;
    setAddingToCart(productId);

    try {
      await addToCart({ productId, quantity: 1 });
      await updateCartCount();
      showToast("Item added to cart", "success", 2500);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to add to cart",
        "error",
        3500
      );
    } finally {
      setAddingToCart(null);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (removingId) return;
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
      await fetchWishlistData();
      showToast("Removed from wishlist", "success", 2200);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to remove item",
        "error",
        3500
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!wishlistData?.products.length || removingId) return;

    setConfirmationModal({
      isOpen: true,
      title: "Clear Wishlist?",
      message:
        "Are you sure you want to clear your wishlist? This action cannot be undone.",
      variant: "warning",
      onConfirm: async () => {
        try {
          for (const item of wishlistData.products) {
            await removeFromWishlist(item.product._id);
          }
          await fetchWishlistData();
          showToast("Wishlist cleared", "success", 2200);
        } catch (error) {
          showToast("Failed to clear wishlist", "error", 3500);
        } finally {
          closeConfirmationModal();
        }
      },
    });
  };

  return {
    wishlistData,
    isLoading,
    addingToCart,
    removingId,
    fetchWishlistData,
    handleAddToCart,
    handleRemoveFromWishlist,
    handleClearAll,
    setWishlistData,
    confirmationModal,
    closeConfirmationModal,
  };
};
