import React from "react";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

export const OrderErrorState = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Package className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
        <p className="text-zinc-400 mb-6">
          {"The order you're looking for doesn't exist."}
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/checkout")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Checkout
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/orders")}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderErrorState;
