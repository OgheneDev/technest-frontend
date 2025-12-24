import React from "react";
import { MapPin, CreditCard } from "lucide-react";
import {
  getStatusColor,
  CheckoutHistory,
  getStatusText,
} from "@/types/checkout";

interface OrderInformationProps {
  checkout: CheckoutHistory;
}

const OrderInformation: React.FC<OrderInformationProps> = ({ checkout }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Shipping Information */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-400" />
          Shipping Address
        </h3>
        <div className="text-zinc-400 space-y-2">
          <p className="text-sm">
            {checkout.shippingAddress || "No shipping address provided"}
          </p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-emerald-400" />
          Payment Information
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Method</span>
            <span className="text-white capitalize">
              {checkout.paymentMethod?.replace("-", " ") || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Reference</span>
            <span className="text-white font-mono">
              {checkout.paymentReference || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Status</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                checkout.status
              )}`}
            >
              {getStatusText(checkout.status)}
            </span>
          </div>
          {checkout.paymentDetails?.transactionId != null && (
            <div className="flex justify-between">
              <span className="text-zinc-400">Transaction ID</span>
              <span className="text-white font-mono text-xs">
                {String(checkout.paymentDetails.transactionId).slice(0, 12)}
                ...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
