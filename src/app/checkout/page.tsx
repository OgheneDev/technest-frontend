"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { initializeCheckout, verifyPayment, getCheckoutHistory } from "@/api/checkout/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/context/CartContext";

interface CheckoutHistory {
  _id: string;
  shippingAddress: string;
  paymentMethod: string;
  total: number | null; // Allow null if API might return it
  status: string;
  createdAt: string;
}

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { cart, updateCartCount } = useCart();

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        const history = await getCheckoutHistory();
        console.log("Checkout history response:", history);
        setCheckoutHistory(history);
      } catch (err: any) {
        console.error("Detailed error fetching checkout history:", err.response || err.message);
        setError("Unable to load checkout history. Please try again later.");
      }
    };

    console.log("Cart:", cart); // Debug cart
    fetchCheckoutHistory();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim() || !paymentMethod.trim()) {
      setError("Please provide both shipping address and payment method");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const checkoutData = await initializeCheckout(shippingAddress.trim(), paymentMethod.trim());
      console.log("Checkout initialization response:", checkoutData);
      Swal.fire({
        title: "Checkout Initiated",
        text: `Please complete the payment with reference: ${checkoutData.reference || "N/A"}`,
        icon: "success",
        background: "#1f2937",
        color: "#fff",
      });
      setPaymentReference(checkoutData.reference || "");
    } catch (error: any) {
      console.error("Detailed error initializing checkout:", error.response || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Failed to initiate checkout. Please try again.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!paymentReference) {
      setError("No payment reference provided");
      return;
    }
    setIsVerifying(true);
    setError(null);

    try {
      const verificationData = await verifyPayment(paymentReference);
      console.log("Payment verification response:", verificationData);
      if (verificationData.status === "success") {
        await Swal.fire({
          title: "Payment Verified",
          text: "Your payment was successful!",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
        });
        setCheckoutHistory([...checkoutHistory, verificationData]);
        setShippingAddress("");
        setPaymentMethod("");
        setPaymentReference("");
        await updateCartCount();
        router.push("/shop");
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error: any) {
      console.error("Detailed error verifying payment:", error.response || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Failed to verify payment. Please try again.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const subtotal = cart?.totalPrice ?? 0;
  const shipping = 2000;
  const tax = typeof subtotal === 'number' && !isNaN(subtotal) ? subtotal * 0.075 : 0;
  const total = typeof subtotal === 'number' && !isNaN(subtotal) ? subtotal + shipping + tax : shipping;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            <div className="lg:col-span-2 xl:col-span-3">
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Shipping Information</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label htmlFor="shippingAddress" className="text-sm text-white/70">
                          Shipping Address
                        </label>
                        <Input
                          id="shippingAddress"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Enter your shipping address"
                          className="bg-white/10 border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="paymentMethod" className="text-sm text-white/70">
                          Payment Method
                        </label>
                        <Input
                          id="paymentMethod"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          placeholder="e.g., Credit Card, PayPal"
                          className="bg-white/10 border-white/20 text-white"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r text-sm from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 border-none"
                      >
                        {isLoading ? "Processing..." : "Initialize Checkout"}
                      </Button>
                    </form>

                    {paymentReference && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-white mb-2">Complete Payment</h3>
                        <Input
                          value={paymentReference}
                          readOnly
                          className="bg-white/10 border-white/20 text-white mb-2"
                        />
                        <Button
                          onClick={handleVerifyPayment}
                          disabled={isVerifying}
                          className="w-full bg-gradient-to-r text-sm from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 border-none"
                        >
                          {isVerifying ? "Verifying..." : "Verify Payment"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {checkoutHistory.length > 0 && (
                <motion.div variants={itemVariants} className="mt-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                    <CardContent className="p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Order History</h2>
                      <div className="space-y-4">
                        {checkoutHistory.map((order) => (
                          <div key={order._id} className="text-sm text-white/70">
                            <div className="flex justify-between">
                              <span>Order ID: {order._id}</span>
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>Address: {order.shippingAddress}</div>
                            <div>Payment: {order.paymentMethod}</div>
                            <div>Total: ₦{formatPrice(order.total ?? 0)}</div>
                            <div className="flex items-center gap-2">
                              Status: {order.status}
                              {order.status === "success" && (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              )}
                            </div>
                            <Separator className="my-2 bg-white/20" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <motion.div variants={itemVariants} className="lg:col-span-1 xl:col-span-1">
              <div className="lg:sticky lg:top-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-white/70">Subtotal</span>
                    <span className="font-medium text-white">₦{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-white/70">Shipping</span>
                    <span className="font-medium text-white">₦{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-white/70">VAT (7.5%)</span>
                    <span className="font-medium text-white">₦{formatPrice(tax)}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between text-cyan-300 font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>₦{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-xs text-white/50 text-center">
                    <p>✓ Secure checkout</p>
                    <p>✓ Free returns within 30 days</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}