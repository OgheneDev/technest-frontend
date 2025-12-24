import React from "react";
import { getStatusText, getStatusColor } from "@/types/checkout";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { Calendar, ArrowRight } from "lucide-react";
import { CheckoutHistory } from "@/types/checkout";
import { Button } from "../ui/button";

interface OrdersCardProps {
  order: CheckoutHistory;
}

const OrdersCard: React.FC<OrdersCardProps> = ({ order }) => {
  return (
    <div
      key={order._id}
      className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status)}
            </span>
            <span className="text-sm text-zinc-500 font-mono">
              Order #{order._id.slice(-8)}
            </span>
            {order.paymentReference && (
              <span className="text-sm text-zinc-500 font-mono">
                Ref: {order.paymentReference.slice(-8)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4" />
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <p className="text-sm text-zinc-400 line-clamp-2">
              {order.shippingAddress || "No shipping address provided"}
            </p>
            <div className="text-sm text-zinc-500">
              <span className="capitalize">
                {order.paymentMethod?.replace("-", " ") ||
                  "Unknown payment method"}
              </span>
              <span className="mx-2">•</span>
              <span>
                {order.items.length || 0} item
                {(order.items.length || 0) !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-zinc-500">Total</div>
            <div className="text-xl font-bold text-emerald-400">
              ₦{formatPrice(order.totalPrice || 0)}
            </div>
          </div>

          <Link href={`/checkout/${order._id}`}>
            <Button className="bg-zinc-800 text-sm cursor-pointer hover:bg-zinc-700 text-white">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
