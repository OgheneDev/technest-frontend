"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ConfirmationStep() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Thank You for Your Order!
          </h3>
          <p className="text-zinc-400 mb-6">
            Your payment has been verified and your order is being processed.
            You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/orders")}
              className="bg-emerald-500 hover:bg-emerald-400 text-black"
            >
              View Order Details
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/shop")}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
