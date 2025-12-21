"use client";

import { Shield, Truck, Package } from "lucide-react";
import { CartItem } from "./CartItem";
import { CartData } from "@/types/cart";

interface CartItemsListProps {
  cartData: CartData;
  onQuantityUpdate: (productId: string, quantity: number) => void;
  onDeleteItem: (productId: string) => void;
}

export function CartItemsList({
  cartData,
  onQuantityUpdate,
  onDeleteItem,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Shield className="h-3 w-3 text-emerald-400" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Truck className="h-3 w-3 text-emerald-400" />
          <span>Free Shipping Over ₦50,000</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Package className="h-3 w-3 text-emerald-400" />
          <span>Easy Returns</span>
        </div>
      </div>

      {/* Cart Items List */}
      {cartData.products.map((item, index) => (
        <CartItem
          key={item.product?._id || `temp-${index}`}
          item={item}
          index={index}
          onQuantityUpdate={onQuantityUpdate}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
}
