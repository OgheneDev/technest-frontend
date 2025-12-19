"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Package,
  Truck,
  Shield,
  Lock,
  RefreshCw,
  Copy,
  Download,
  FileText,
  Calendar,
  MapPin,
  Wallet,
  X,
  AlertCircle,
} from "lucide-react";
import {
  initializeCheckout,
  verifyPayment,
  getCheckoutHistory,
} from "@/api/checkout/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/context/CartContext";

interface CheckoutHistory {
  _id: string;
  shippingAddress: string;
  paymentMethod: string;
  total: number | null;
  status: string;
  createdAt: string;
  reference?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartData {
  items?: CartItem[];
  totalPrice?: number;
}

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "transfer", name: "Bank Transfer", icon: Wallet },
  { id: "wallet", name: "Digital Wallet", icon: CreditCard },
  { id: "cash", name: "Cash on Delivery", icon: Package },
];

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { cart, updateCartCount } = useCart();

  const cartData = cart as CartData | undefined;

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        const history = await getCheckoutHistory();
        console.log("Checkout history response:", history);
        setCheckoutHistory(history);
      } catch (err: any) {
        console.error("Error fetching checkout history:", err);
        setError("Unable to load checkout history");
      }
    };

    fetchCheckoutHistory();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    Swal.fire({
      title: "Copied!",
      text: "Reference copied to clipboard",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#0a0a0a",
      color: "#fff",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      setError("Please provide shipping address");
      Swal.fire({
        title: "Error",
        text: "Please provide shipping address",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      setError("Please select a payment method");
      Swal.fire({
        title: "Error",
        text: "Please select a payment method",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
      return;
    }

    if (!cartData?.items || cartData.items.length === 0) {
      setError("Your cart is empty");
      Swal.fire({
        title: "Empty Cart",
        text: "Your cart is empty",
        icon: "warning",
        background: "#0a0a0a",
        color: "#fff",
      });
      router.push("/shop");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const checkoutData = await initializeCheckout(
        shippingAddress.trim(),
        selectedPaymentMethod
      );

      console.log("Checkout initialization response:", checkoutData);

      setPaymentReference(checkoutData.reference || "");

      Swal.fire({
        title: "Success!",
        text: `Checkout initialized. Reference: ${checkoutData.reference}`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Copy Reference",
        cancelButtonText: "Continue",
        background: "#0a0a0a",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          copyToClipboard(checkoutData.reference || "");
        }
      });

      setActiveStep(2);
    } catch (error: any) {
      console.error("Error initializing checkout:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Failed to initialize checkout",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!paymentReference) {
      setError("No payment reference provided");
      Swal.fire({
        title: "Error",
        text: "No payment reference provided",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const verificationData = await verifyPayment(paymentReference);
      console.log("Payment verification response:", verificationData);

      if (verificationData.status === "success") {
        Swal.fire({
          title: "Payment Verified!",
          text: "Your payment was successful!",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });

        setCheckoutHistory([verificationData, ...checkoutHistory]);
        setShippingAddress("");
        setSelectedPaymentMethod("");
        setPaymentReference("");

        if (updateCartCount) {
          await updateCartCount();
        }

        setActiveStep(3);

        setTimeout(() => {
          router.push("/orders?success=true");
        }, 3000);
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Failed to verify payment",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const subtotal = cartData?.totalPrice ?? 0;
  const shipping = subtotal > 50000 ? 0 : 2000;
  const tax =
    typeof subtotal === "number" && !isNaN(subtotal) ? subtotal * 0.075 : 0;
  const total =
    typeof subtotal === "number" && !isNaN(subtotal)
      ? subtotal + shipping + tax
      : shipping;

  const getStatusColor = (status?: string | null) => {
    const s = typeof status === "string" ? status.toLowerCase() : "";
    switch (s) {
      case "success":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    }
  };

  const steps = [
    { id: 1, label: "Details", icon: FileText },
    { id: 2, label: "Payment", icon: CreditCard },
    { id: 3, label: "Confirm", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Cart
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Lock className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold text-white">
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
              style={{
                width:
                  activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%",
              }}
            />

            {steps.map((step) => (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
              >
                <button
                  onClick={() =>
                    step.id <= activeStep && setActiveStep(step.id)
                  }
                  disabled={step.id > activeStep}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                    ${
                      activeStep === step.id
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/50"
                        : step.id < activeStep
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    }
                    ${
                      step.id <= activeStep
                        ? "cursor-pointer hover:scale-105"
                        : "cursor-not-allowed"
                    }
                  `}
                >
                  <step.icon className="h-5 w-5" />
                </button>
                <span
                  className={`text-sm font-medium ${
                    activeStep === step.id
                      ? "text-emerald-400"
                      : step.id < activeStep
                      ? "text-emerald-400/70"
                      : "text-zinc-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Checkout Details */}
            {activeStep === 1 && (
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

                  <form onSubmit={handleCheckout} className="space-y-6">
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
                              onClick={() =>
                                setSelectedPaymentMethod(method.id)
                              }
                              className={`
                                p-4 border rounded-lg text-left transition-all duration-200
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
                      disabled={
                        isLoading || !shippingAddress || !selectedPaymentMethod
                      }
                      className="w-full py-6 text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-black"
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
            )}

            {/* Step 2: Payment */}
            {activeStep === 2 && paymentReference && (
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
                          onClick={() => copyToClipboard(paymentReference)}
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
                      <h4 className="font-semibold text-white">
                        Payment Instructions:
                      </h4>
                      <ol className="space-y-2 text-sm text-zinc-400 list-decimal pl-5">
                        <li>Copy the reference number above</li>
                        <li>
                          Complete payment via your selected method (
                          {selectedPaymentMethod})
                        </li>
                        <li>Return here and click "Verify Payment"</li>
                        <li>
                          Your order will be processed immediately upon
                          verification
                        </li>
                      </ol>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleVerifyPayment}
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
                        onClick={() => setActiveStep(1)}
                        className="py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {activeStep === 3 && (
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
                      Your payment has been verified and your order is being
                      processed. You will receive a confirmation email shortly.
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
            )}

            {/* Order History Section */}
            {checkoutHistory.length > 0 && activeStep === 1 && (
              <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-400" />
                    Recent Orders
                  </h2>
                </div>

                <div className="space-y-4">
                  {checkoutHistory.slice(0, 3).map((order) => (
                    <div
                      key={order._id}
                      className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status ?? "Unknown"}
                            </span>
                            <span className="text-sm text-zinc-500 font-mono">
                              #{order._id.slice(-8)}
                            </span>
                          </div>
                          <div className="text-sm text-zinc-400">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              {order.shippingAddress}
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="text-lg font-bold text-emerald-400">
                            ₦{formatPrice(order.total ?? 0)}
                          </div>
                          <div className="text-sm text-zinc-500">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {checkoutHistory.length > 3 && (
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    onClick={() => setActiveStep(1)}
                  >
                    View All Orders ({checkoutHistory.length})
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-full">
                  {cartData?.items?.length || 0} items
                </div>
              </div>

              <div className="space-y-4">
                {cartData?.items?.map((item: CartItem) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        {item.quantity} × ₦{formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="font-semibold text-emerald-400">
                      ₦{formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-zinc-700" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-medium text-white">
                    ₦{formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">
                    Shipping
                    {shipping === 0 && (
                      <span className="ml-2 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-white">
                    {shipping === 0 ? "FREE" : `₦${formatPrice(shipping)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">VAT (7.5%)</span>
                  <span className="font-medium text-white">
                    ₦{formatPrice(tax)}
                  </span>
                </div>

                <Separator className="bg-zinc-700" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-emerald-400">Total</span>
                  <span className="text-emerald-400">
                    ₦{formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="space-y-3 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    <span>Secure payment with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-400" />
                    <span>Delivery within 3-5 business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-emerald-400" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-zinc-700 text-emerald-400 hover:bg-zinc-800"
                onClick={() => {
                  const orderSummary = `Order Summary:\nSubtotal: ₦${formatPrice(
                    subtotal
                  )}\nShipping: ${
                    shipping === 0 ? "FREE" : `₦${formatPrice(shipping)}`
                  }\nVAT: ₦${formatPrice(tax)}\nTotal: ₦${formatPrice(total)}`;
                  copyToClipboard(orderSummary);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Copy Summary
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-zinc-800">
        <div className="container mx-auto px-4 pb-8">
          <div className="text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} TechNest. All rights reserved.</p>
            <p className="mt-1">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
