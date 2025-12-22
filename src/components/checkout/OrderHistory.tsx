"use client";

import { Calendar, Truck, Package, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import {
  CheckoutHistory,
  getStatusColor,
  getStatusText,
} from "@/types/checkout";

interface OrderHistoryProps {
  checkoutHistory: CheckoutHistory[];
  activeStep: number;
  showAllOrders: boolean;
  setShowAllOrders: (show: boolean) => void;
  onCancelCheckout?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onLoadMore?: () => void;
}

export function OrderHistory({
  checkoutHistory,
  activeStep,
  showAllOrders,
  setShowAllOrders,
  onCancelCheckout,
  currentPage = 1,
  totalPages = 1,
  onLoadMore,
}: OrderHistoryProps) {
  if (activeStep !== 1 || checkoutHistory.length === 0) return null;

  const ordersToShow = showAllOrders
    ? checkoutHistory
    : checkoutHistory.slice(0, 3);

  const canCancel = (status: string) => status === "pending";

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
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <span className="text-sm text-zinc-500 font-mono">
                    {order.paymentReference
                      ? `Ref: ${order.paymentReference.slice(-8)}`
                      : `ID: ${order._id.slice(-8)}`}
                  </span>
                </div>

                <div className="text-sm text-zinc-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="truncate">
                      {order.shippingAddress || "No shipping address provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-500">
                    <Package className="h-4 w-4" />
                    <span>
                      {order.cart?.products?.length || 0} item
                      {(order.cart?.products?.length || 0) !== 1 ? "s" : ""}
                    </span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">
                      {order.paymentMethod?.replace("-", " ") ||
                        "Unknown payment"}
                    </span>
                  </div>
                </div>

                {canCancel(order.status) && onCancelCheckout && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancelCheckout(order._id)}
                    className="mt-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>

              <div className="text-right space-y-1">
                <div className="text-lg font-bold text-emerald-400">
                  ₦{formatPrice(order.totalPrice || 0)}
                </div>
                <div className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs text-zinc-600">
                  {new Date(order.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAllOrders && checkoutHistory.length > 3 && (
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

      {showAllOrders && currentPage < totalPages && onLoadMore && (
        <Button
          variant="outline"
          className="w-full mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          onClick={onLoadMore}
        >
          Load More
        </Button>
      )}
    </div>
  );
}
