"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="lg:sticky lg:top-24 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">Order Summary</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Subtotal</span>
            <span className="text-white">₦{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Shipping</span>
            <span className="text-white">₦{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">VAT (7.5%)</span>
            <span className="text-white">₦{formatPrice(tax)}</span>
          </div>
          <Separator className="bg-zinc-700" />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-emerald-400">Total</span>
            <span className="text-emerald-400">₦{formatPrice(total)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full bg-emerald-500 font-semibold hover:bg-emerald-400 text-black"
            asChild
            size="sm"
          >
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full border-zinc-700 text-sm font-semibold hover:bg-zinc-800"
            asChild
          >
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>

        {/* Trust Info */}
        <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="h-3 w-3 text-emerald-400" />
            Secure SSL encryption
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Package className="h-3 w-3 text-emerald-400" />
            30-day return policy
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Truck className="h-3 w-3 text-emerald-400" />
            Free shipping on orders over ₦50,000
          </div>
        </div>
      </div>
    </div>
  );
}
