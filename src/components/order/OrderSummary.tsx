import React from "react";
import { ShoppingBag, Package } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { CheckoutHistory } from "@/types/checkout";

interface OrderSummaryProps {
  checkout: CheckoutHistory;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ checkout }) => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-emerald-400" />
        Order Summary
      </h2>

      <div className="space-y-4">
        {checkout.cart?.products?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg"
          >
            <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
              {item.product?.images?.[0] ? (
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-8 w-8 text-zinc-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate">
                {item.product?.name || "Product"}
              </h4>
              <p className="text-sm text-zinc-400">
                Quantity: {item.quantity} × ₦
                {formatPrice(item.product?.price || 0)}
              </p>
            </div>
            <div className="font-semibold text-emerald-400">
              ₦{formatPrice((item.product?.price || 0) * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Order Total */}
      <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Subtotal</span>
          <span className="font-medium text-white">
            ₦{formatPrice(checkout.totalPrice || 0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Shipping</span>
          <span className="font-medium text-white">₦{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Tax</span>
          <span className="font-medium text-white">
            ₦
            {formatPrice(checkout.totalPrice ? checkout.totalPrice * 0.075 : 0)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-zinc-700">
          <span className="text-emerald-400">Total</span>
          <span className="text-emerald-400">
            ₦
            {formatPrice(checkout.totalPrice ? checkout.totalPrice * 1.075 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
