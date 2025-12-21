"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@/types/products";

interface WishlistProductCardProps {
  product: Product;
  index?: number;
  isAddingToCart: boolean;
  isRemoving: boolean;
  onAddToCart: (productId: string, price: number) => void;
  onRemoveFromWishlist: (productId: string) => void;
  variants?: any;
}

export function WishlistProductCard({
  product,
  index,
  isAddingToCart,
  isRemoving,
  onAddToCart,
  onRemoveFromWishlist,
  variants,
}: WishlistProductCardProps) {
  return (
    <motion.div
      key={product._id}
      layout
      variants={variants}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
      }}
      whileHover={{
        y: -4,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      className="group bg-zinc-900/60 backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300"
    >
      {/* Product Image */}
      <Link href={`/products/${product._id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick View Button */}
          <div className="absolute top-2 right-2">
            <Button
              asChild
              size="icon"
              className="h-8 w-8 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Link href={`/products/${product._id}`}>
                <Eye className="h-4 w-4 text-emerald-400" />
              </Link>
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {product.category && (
          <div className="text-xs text-emerald-400 font-medium mb-1">
            {product.category}
          </div>
        )}

        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 hover:text-emerald-300 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-emerald-400">
              ₦{formatPrice(product.price)}
            </span>
            {product.stock < 10 && product.stock > 0 && (
              <div className="text-xs text-amber-400 mt-1">
                Only {product.stock} left
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onAddToCart(product._id, product.price)}
              disabled={isAddingToCart || product.stock === 0}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  {product.stock === 0 ? "Out" : "Add"}
                </>
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRemoveFromWishlist(product._id)}
              disabled={isRemoving}
              className="h-8 w-8 text-zinc-400 hover:text-red-400 cursor-pointer hover:bg-red-400/10"
              title="Remove from wishlist"
            >
              {isRemoving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
