"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center py-16"
    >
      <div className="relative inline-block mb-6">
        <ShoppingCart className="h-20 w-20 text-emerald-400/20" />
      </div>

      <h2 className="text-xl font-semibold text-white mb-3">
        Your cart is empty
      </h2>
      <p className="text-zinc-400 mb-8">
        Discover amazing products and add them to your cart
      </p>

      <Button
        asChild
        className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
        size="lg"
      >
        <Link href="/shop">
          Start Shopping
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Link>
      </Button>
    </motion.div>
  );
}
