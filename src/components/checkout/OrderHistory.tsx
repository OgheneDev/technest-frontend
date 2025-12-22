"use client";

import { Calendar, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { CheckoutHistory, getStatusColor } from "@/types/checkout";

interface OrderHistoryProps {
  checkoutHistory: CheckoutHistory[];
  activeStep: number;
  showAllOrders: boolean;
  setShowAllOrders: (show: boolean) => void;
}

export function OrderHistory({
  checkoutHistory,
  activeStep,
  showAllOrders,
  setShowAllOrders,
}: OrderHistoryProps) {
  if (activeStep !== 1 || checkoutHistory.length === 0) return null;

  const ordersToShow = showAllOrders
    ? checkoutHistory
    : checkoutHistory.slice(0, 3);

  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-400" />
          Recent Orders
        </h2>
      </div>

      <div className="space-y-4">
        {ordersToShow.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status ?? "Unknown"}
                  </span>
                  <span className="text-sm text-zinc-500 font-mono">
                    #{order._id.slice(-8)}
                  </span>
                </div>
                <div className="text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {order.shippingAddress}
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-lg font-bold text-emerald-400">
                  ₦{formatPrice(order.total ?? 0)}
                </div>
                <div className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {checkoutHistory.length > 3 && (
        <Button
          variant="outline"
          className="w-full mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          onClick={() => setShowAllOrders(!showAllOrders)}
        >
          {showAllOrders
            ? "Show Less"
            : `View All Orders (${checkoutHistory.length})`}
        </Button>
      )}
    </div>
  );
}
