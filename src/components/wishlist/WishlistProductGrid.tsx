"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WishlistProductCard } from "./WishlistProductCard";
import {
  WishlistItem,
  containerVariants,
  itemVariants,
} from "@/types/wishlist";

interface WishlistProductsGridProps {
  products: WishlistItem[];
  addingToCart: string | null;
  removingId: string | null;
  onAddToCart: (productId: string, price: number) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export function WishlistProductsGrid({
  products,
  addingToCart,
  removingId,
  onAddToCart,
  onRemoveFromWishlist,
}: WishlistProductsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map(({ product }, index) => (
            <WishlistProductCard
              key={product._id}
              product={product}
              index={index}
              isAddingToCart={addingToCart === product._id}
              isRemoving={removingId === product._id}
              onAddToCart={onAddToCart}
              onRemoveFromWishlist={onRemoveFromWishlist}
              variants={itemVariants}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
