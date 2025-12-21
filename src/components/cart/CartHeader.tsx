"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartHeaderProps {
  itemCount: number;
  onClearCart: () => void;
}

export function CartHeader({ itemCount, onClearCart }: CartHeaderProps) {
  return (
    <>
      <div className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="mb-8 mx-auto px-4 sm:px-6 py-8">
        <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium tracking-wide mb-4">
          <ShoppingCart className="h-3 w-3 mr-2" />
          SHOPPING CART
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Your <span className="text-emerald-400">Cart</span>
              {itemCount > 0 && (
                <span className="ml-2 text-lg font-normal text-zinc-400">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
            <p className="text-zinc-400 mt-1">
              {itemCount > 0
                ? "Review and checkout your items"
                : "Start adding items to your cart"}
            </p>
          </div>

          {itemCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
              onClick={onClearCart}
            >
              <X className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
