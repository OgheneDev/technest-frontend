"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { itemVariants } from "@/types/wishlist";

interface WishlistBottomCTAProps {
  itemCount: number;
}

export function WishlistBottomCTA({ itemCount }: WishlistBottomCTAProps) {
  if (itemCount === 0) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="text-center pt-8 border-t border-zinc-800"
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          className="bg-emerald-500 hover:bg-emerald-400 font-semibold text-black"
          size="sm"
        >
          <Link href="/cart">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-zinc-700 text-white font-semibold hover:bg-zinc-800"
          size="sm"
        >
          <Link href="/shop">
            Continue Shopping
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
