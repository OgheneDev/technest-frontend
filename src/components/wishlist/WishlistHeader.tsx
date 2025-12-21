"use client";

import Link from "next/link";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WishlistHeaderProps {
  itemCount: number;
  onClearAll: () => void;
  isRemoving: boolean;
}

export function WishlistHeader({
  itemCount,
  onClearAll,
  isRemoving,
}: WishlistHeaderProps) {
  return (
    <>
      {/* Navigation */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>

            {itemCount > 0 && (
              <Button
                onClick={onClearAll}
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                disabled={isRemoving}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 mx-auto px-4 sm:px-6 py-8"
      >
        <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium tracking-wide mb-4">
          <Heart className="h-3 w-3 mr-2 fill-emerald-400/20" />
          MY WISHLIST
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          Your Saved <span className="text-emerald-400">Favorites</span>
        </h1>

        <p className="text-zinc-400">
          {itemCount > 0
            ? `${itemCount} ${itemCount === 1 ? "item" : "items"} saved`
            : "Start saving items you love"}
        </p>
      </motion.div>
    </>
  );
}
