import React from "react";
import { Button } from "../ui/button";
import { Printer, Download, ArrowLeft, CheckCircle } from "lucide-react";
import { CheckoutHistory } from "@/types/checkout";
import { useRouter } from "next/navigation";

interface Props {
  checkout: CheckoutHistory;
  downloadInvoice: () => void;
  onPrint: () => void;
}

const OrderHeader: React.FC<Props> = ({
  checkout,
  downloadInvoice,
  onPrint,
}) => {
  const router = useRouter();
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Order Details</h1>
          <p className="text-zinc-400">
            Order #{checkout._id.slice(-8)} •<span className="mx-2">•</span>
            <span className="capitalize">
              {checkout.paymentMethod?.replace("-", " ")}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPrint}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={downloadInvoice}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
          <Button
            onClick={() => router.push("/checkout")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Success banner */}
      {checkout.status === "completed" && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-emerald-400">
                Payment Successful!
              </h3>
              <p className="text-emerald-300/70 text-sm">
                Your payment has been confirmed. Your order is being processed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHeader;
