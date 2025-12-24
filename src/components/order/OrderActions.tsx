import React from "react";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderActionsProps {
  onDownloadReceipt: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ onDownloadReceipt }) => {
  const router = useRouter();
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
      <h3 className="font-semibold text-white mb-4">Order Actions</h3>
      <div className="space-y-3">
        <Button
          onClick={() => router.push("/shop")}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black"
        >
          Continue Shopping
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/orders")}
          className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          View All Orders
        </Button>
        <Button
          variant="outline"
          onClick={onDownloadReceipt}
          className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default OrderActions;
