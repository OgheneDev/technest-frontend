"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/formatPrice";
import { WishlistItem, itemVariants } from "@/types/wishlist";

interface WishlistStatsProps {
  items: WishlistItem[];
}

export function WishlistStats({ items }: WishlistStatsProps) {
  const totalValue = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center justify-between p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Heart className="h-4 w-4 text-emerald-400 mr-2" />
          <span className="text-white font-medium">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="hidden sm:block text-sm text-zinc-400">
          Total Value: ₦{formatPrice(totalValue)}
        </div>
      </div>
    </motion.div>
  );
}
