"use client";

import { Package, Shield, Truck, RefreshCw, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import { CartData } from "@/types/checkout";

interface OrderSummaryProps {
  cartData: CartData | undefined;
  copyToClipboard: (text: string) => void;
}

export function OrderSummary({ cartData, copyToClipboard }: OrderSummaryProps) {
  const subtotal = cartData?.totalPrice ?? 0;
  const shipping = subtotal > 50000 ? 0 : 2000;
  const tax =
    typeof subtotal === "number" && !isNaN(subtotal) ? subtotal * 0.075 : 0;
  const total =
    typeof subtotal === "number" && !isNaN(subtotal)
      ? subtotal + shipping + tax
      : shipping;

  return (
    <div className="lg:sticky lg:top-24 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-full">
          {cartData?.items?.length || 0} items
        </div>
      </div>

      <div className="space-y-4">
        {cartData?.items?.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-8 w-8 text-zinc-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate">{item.name}</h4>
              <p className="text-sm text-zinc-400">
                {item.quantity} × ₦{formatPrice(item.price)}
              </p>
            </div>
            <div className="font-semibold text-emerald-400">
              ₦{formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-zinc-700" />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Subtotal</span>
          <span className="font-medium text-white">
            ₦{formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-400">
            Shipping
            {shipping === 0 && (
              <span className="ml-2 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                FREE
              </span>
            )}
          </span>
          <span className="font-medium text-white">
            {shipping === 0 ? "FREE" : `₦${formatPrice(shipping)}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-400">VAT (7.5%)</span>
          <span className="font-medium text-white">₦{formatPrice(tax)}</span>
        </div>

        <Separator className="bg-zinc-700" />

        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-emerald-400">Total</span>
          <span className="text-emerald-400">₦{formatPrice(total)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800">
        <div className="space-y-3 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Secure payment with SSL encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-emerald-400" />
            <span>Delivery within 3-5 business days</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-emerald-400" />
            <span>30-day return policy</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-zinc-700 text-sm text-emerald-400 hover:bg-zinc-800"
        onClick={() => {
          const orderSummary = `Order Summary:\nSubtotal: ₦${formatPrice(
            subtotal
          )}\nShipping: ${
            shipping === 0 ? "FREE" : `₦${formatPrice(shipping)}`
          }\nVAT: ₦${formatPrice(tax)}\nTotal: ₦${formatPrice(total)}`;
          copyToClipboard(orderSummary);
        }}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy Summary
      </Button>
    </div>
  );
}
