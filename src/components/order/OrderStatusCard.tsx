import React from "react";
import { Clock, CheckCircle } from "lucide-react";
import { CheckoutHistory } from "@/types/checkout";

interface OrderStatusCardProps {
  checkout: CheckoutHistory;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ checkout }) => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-emerald-400" />
        Order Status
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Order Placed</div>
            <div className="text-sm text-zinc-500">
              {new Date(checkout.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-black" />
          </div>
        </div>

        <div className="h-6 w-0.5 bg-emerald-500 ml-4"></div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Payment</div>
            <div className="text-sm text-zinc-500">
              {checkout.status === "completed" ? "Completed" : "Pending"}
            </div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              checkout.status === "completed"
                ? "bg-emerald-500"
                : "bg-zinc-800 border border-zinc-700"
            }`}
          >
            {checkout.status === "completed" ? (
              <CheckCircle className="h-4 w-4 text-black" />
            ) : (
              <Clock className="h-4 w-4 text-zinc-500" />
            )}
          </div>
        </div>

        <div className="h-6 w-0.5 bg-zinc-800 ml-4"></div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Processing</div>
            <div className="text-sm text-zinc-500">Preparing your order</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Clock className="h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div className="h-6 w-0.5 bg-zinc-800 ml-4"></div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Shipped</div>
            <div className="text-sm text-zinc-500">On the way</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Clock className="h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div className="h-6 w-0.5 bg-zinc-800 ml-4"></div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Delivered</div>
            <div className="text-sm text-zinc-500">Expected soon</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Clock className="h-4 w-4 text-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;
