"use client";

import {
  Package,
  CreditCard,
  MapPin,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { paymentMethods } from "@/types/checkout";

interface CheckoutFormProps {
  shippingAddress: string;
  setShippingAddress: (address: string) => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutForm({
  shippingAddress,
  setShippingAddress,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  isLoading,
  error,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-400" />
            Shipping Information
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  Shipping Address
                </div>
              </label>
              <textarea
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address..."
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-500 transition-all resize-none min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-400" />
                  Payment Method
                </div>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`
                      p-4 border rounded-lg text-left cursor-pointer transition-all duration-200
                      ${
                        selectedPaymentMethod === method.id
                          ? "border-emerald-500/50 bg-emerald-500/10 ring-2 ring-emerald-500/20"
                          : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedPaymentMethod === method.id
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        <method.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-white">
                        {method.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !shippingAddress || !selectedPaymentMethod}
            className="w-full py-6 font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue to Payment"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
