"use client";

import { CheckCircle, Lock, Copy, Shield, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PaymentStepProps {
  paymentReference: string;
  selectedPaymentMethod: string;
  isVerifying: boolean;
  copied: boolean;
  onVerifyPayment: () => void;
  onCopyToClipboard: (text: string) => void;
  onBack: () => void;
}

export function PaymentStep({
  paymentReference,
  selectedPaymentMethod,
  isVerifying,
  copied,
  onVerifyPayment,
  onCopyToClipboard,
  onBack,
}: PaymentStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            Complete Your Payment
          </h2>
        </div>

        <div className="space-y-6">
          <div className="text-center p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Payment Reference
            </h3>
            <p className="text-zinc-400 mb-4">
              Use this reference to complete your payment
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <code className="px-4 py-3 bg-zinc-800 text-emerald-400 font-mono text-lg rounded-lg border border-zinc-700">
                {paymentReference}
              </code>
              <button
                onClick={() => onCopyToClipboard(paymentReference)}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Copy className="h-5 w-5 text-zinc-400" />
                )}
              </button>
            </div>

            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Secure SSL encryption</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>No credit card information stored</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Payment Instructions:</h4>
            <ol className="space-y-2 text-sm text-zinc-400 list-decimal pl-5">
              <li>Copy the reference number above</li>
              <li>
                Complete payment via your selected method (
                {selectedPaymentMethod})
              </li>
              <li>Return here and click "Verify Payment"</li>
              <li>
                Your order will be processed immediately upon verification
              </li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onVerifyPayment}
              disabled={isVerifying}
              className="flex-1 py-6 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Payment"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
