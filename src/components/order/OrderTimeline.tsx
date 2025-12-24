import React from "react";
import Link from "next/link";
import { Calendar, ShoppingBag, CreditCard } from "lucide-react";
import { CheckoutHistory } from "@/types/checkout";

interface OrderTimelineProps {
  checkout: CheckoutHistory;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ checkout }) => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-emerald-400" />
        Order Timeline
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-medium">Order Created</div>
            <div className="text-sm text-zinc-500">
              {new Date(checkout.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {checkout.status === "completed" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-white font-medium">Payment Completed</div>
              <div className="text-sm text-zinc-500">
                {checkout.paymentDetails?.paidAt
                  ? new Date(checkout.paymentDetails.paidAt).toLocaleString()
                  : "Recently"}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <p className="text-sm text-zinc-500">
            Need help with your order?{" "}
            <Link
              href="/contact"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
