"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCheckoutById } from "@/api/checkout/requests";
import { CheckoutHistory } from "@/types/checkout";
import {
  Package,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Calendar,
  ArrowLeft,
  Printer,
  Download,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { getStatusColor, getStatusText } from "@/types/checkout";
import Link from "next/link";

export default function CheckoutDetailPage() {
  const params = useParams();
  const router = useRouter();
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
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !checkout) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <Package className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Order Not Found
          </h2>
          <p className="text-zinc-400 mb-6">
            {error || "The order you're looking for doesn't exist."}
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
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // You can implement PDF generation here
    alert("Invoice download feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
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
                onClick={handlePrint}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
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
                    Your payment has been confirmed. Your order is being
                    processed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-emerald-400" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {checkout.cart?.products?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">
                        {item.product?.name || "Product"}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        Quantity: {item.quantity} × ₦
                        {formatPrice(item.product?.price || 0)}
                      </p>
                    </div>
                    <div className="font-semibold text-emerald-400">
                      ₦{formatPrice((item.product?.price || 0) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-medium text-white">
                    ₦{formatPrice(checkout.totalPrice || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="font-medium text-white">
                    ₦{formatPrice(0)} {/* You can add shipping calculation */}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Tax</span>
                  <span className="font-medium text-white">
                    ₦
                    {formatPrice(
                      checkout.totalPrice ? checkout.totalPrice * 0.075 : 0
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-zinc-700">
                  <span className="text-emerald-400">Total</span>
                  <span className="text-emerald-400">
                    ₦
                    {formatPrice(
                      checkout.totalPrice ? checkout.totalPrice * 1.075 : 0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Information */}
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
                  {checkout.paymentDetails?.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Transaction ID</span>
                      <span className="text-white font-mono text-xs">
                        {checkout.paymentDetails.transactionId.slice(0, 12)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Status & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Status Card */}
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
                      {checkout.status === "completed"
                        ? "Completed"
                        : "Pending"}
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
                    <div className="text-sm text-zinc-500">
                      Preparing your order
                    </div>
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

            {/* Order Timeline */}
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
                      <div className="text-white font-medium">
                        Payment Completed
                      </div>
                      <div className="text-sm text-zinc-500">
                        {checkout.paymentDetails?.paidAt
                          ? new Date(
                              checkout.paymentDetails.paidAt
                            ).toLocaleString()
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

            {/* Actions */}
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
                  onClick={() => window.print()}
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
