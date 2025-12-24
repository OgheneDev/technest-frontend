"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCheckoutById } from "@/api/checkout/requests";
import { CheckoutHistory } from "@/types/checkout";
import Loader from "@/components/ui/Loader";
import OrderErrorState from "@/components/order/OrderErrorState";
import OrderHeader from "@/components/order/OrderHeader";
import {
  handlePrintReceipt,
  handleDownloadInvoice,
} from "@/utils/printInvoice";
import OrderSummary from "@/components/order/OrderSummary";
import OrderInformation from "@/components/order/OrderInformation";
import OrderStatusCard from "@/components/order/OrderStatusCard";
import OrderTimeline from "@/components/order/OrderTimeline";
import OrderActions from "@/components/order/OrderActions";

export default function CheckoutDetailPage() {
  const params = useParams();
  const [checkout, setCheckout] = useState<CheckoutHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const id = params.id as string;
        const data = await getCheckoutById(id);
        setCheckout(data);
      } catch (err: any) {
        setError(err.message || "Failed to load checkout details");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  if (error || !checkout) {
    return <OrderErrorState />;
  }

  const handlePrint = () => {
    handlePrintReceipt(checkout);
  };

  const handleDownloadInvoiceClick = () => {
    handleDownloadInvoice(checkout);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <OrderHeader
          checkout={checkout}
          downloadInvoice={handleDownloadInvoiceClick}
          onPrint={handlePrint}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <OrderSummary checkout={checkout} />

            <OrderInformation checkout={checkout} />
          </div>

          {/* Right Column - Order Status & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            <OrderStatusCard checkout={checkout} />

            <OrderTimeline checkout={checkout} />

            <OrderActions
              onDownloadReceipt={() => handleDownloadInvoice(checkout)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
