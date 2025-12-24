"use client";

import Link from "next/link";
import { Heart, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function EmptyWishlistState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="max-w-md mx-auto text-center py-16"
    >
      <div className="relative inline-block mb-6">
        <Heart className="h-20 w-20 text-emerald-400/20" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">
        Your wishlist is empty
      </h3>
      <p className="text-zinc-400 mb-8">
        Save products by clicking the heart icon
      </p>

      <Button
        asChild
        className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold"
        size="lg"
      >
        <Link href="/shop">
          Explore Products
          <PlusCircle className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
