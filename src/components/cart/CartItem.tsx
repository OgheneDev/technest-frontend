"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem as CartItemType, FALLBACK_IMAGE } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onQuantityUpdate: (productId: string, quantity: number) => void;
  onDeleteItem: (productId: string) => void;
}

export function CartItem({
  item,
  index,
  onQuantityUpdate,
  onDeleteItem,
}: CartItemProps) {
  const calculateItemPrice = () => {
    if (!item.product) return 0;
    return (item.product.price || 0) * item.quantity;
  };

  return (
    <motion.div
      key={item.product?._id || `temp-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all"
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="relative h-32 w-full sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
            <Image
              src={item.product?.images?.[0] || FALLBACK_IMAGE}
              alt={item.product?.name || "Product"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 96px"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/products/${item.product?._id}`} className="flex-1">
                <h3 className="font-semibold text-white hover:text-emerald-300 transition-colors line-clamp-2">
                  {item.product?.name || "Unavailable Product"}
                </h3>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                onClick={() => onDeleteItem(item.product?._id || "")}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-emerald-400 mb-4">
              ₦{formatPrice(item.product?.price || 0)} each
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() =>
                    onQuantityUpdate(
                      item.product?._id || "",
                      Math.max(1, item.quantity - 1)
                    )
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 h-8 text-center bg-zinc-800 border-zinc-700 text-white"
                  onChange={(e) =>
                    onQuantityUpdate(
                      item.product?._id || "",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() =>
                    onQuantityUpdate(item.product?._id || "", item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-emerald-400">
                  ₦{formatPrice(calculateItemPrice())}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
}
