"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { WishlistSkeleton } from "@/components/wishlist/WishlistSkeleton";
import { useWishlistOperations } from "@/hooks/useWishlistOperations";
import { WishlistHeader } from "@/components/wishlist/WishlistHeader";
import { EmptyWishlistState } from "@/components/wishlist/EmptyWishlistState";
import { WishlistProductsGrid } from "@/components/wishlist/WishlistProductGrid";
import { WishlistStats } from "@/components/wishlist/WishlistStats";
import { WishlistBottomCTA } from "@/components/wishlist/WishlistBottomCTA";
import { containerVariants } from "@/types/wishlist";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function WishlistPage() {
  const {
    wishlistData,
    isLoading,
    addingToCart,
    removingId,
    fetchWishlistData,
    handleAddToCart,
    handleRemoveFromWishlist,
    handleClearAll,
    confirmationModal,
    closeConfirmationModal,
  } = useWishlistOperations();

  useEffect(() => {
    fetchWishlistData();
  }, [fetchWishlistData]);

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  const itemCount = wishlistData?.products.length || 0;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient - Fixed position */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <WishlistHeader
        itemCount={itemCount}
        onClearAll={handleClearAll}
        isRemoving={removingId !== null}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {itemCount === 0 ? (
          <EmptyWishlistState />
        ) : (
          wishlistData && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <WishlistStats items={wishlistData.products} />

              <WishlistProductsGrid
                products={wishlistData.products}
                addingToCart={addingToCart}
                removingId={removingId}
                onAddToCart={handleAddToCart}
                onRemoveFromWishlist={handleRemoveFromWishlist}
              />

              <WishlistBottomCTA itemCount={itemCount} />
            </motion.div>
          )
        )}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        variant={confirmationModal.variant}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
}
