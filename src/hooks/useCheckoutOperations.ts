"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  initializeCheckout,
  verifyPayment,
  getCheckoutHistory,
  cancelCheckout,
} from "@/api/checkout/requests";
import { useCart } from "@/context/CartContext";
import { CheckoutHistory, CartData } from "@/types/checkout";
import { useCheckoutStore } from "@/store/checkoutStore";

export const useCheckoutOperations = () => {
  const {
    activeStep,
    shippingAddress,
    selectedPaymentMethod,
    paymentReference,
    authorizationUrl,
    setActiveStep,
    setShippingAddress,
    setSelectedPaymentMethod,
    setPaymentReference,
    setAuthorizationUrl,
    resetCheckout,
  } = useCheckoutStore();
  const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const router = useRouter();
  const { cart, updateCartCount } = useCart();

  const cartData = cart
    ? {
        items: cart.products.map((item) => ({
          _id: item.product?._id || "",
          name: item.product?.name || "",
          price: item.product?.price || 0,
          image: item.product?.images?.[0] || "",
          quantity: item.quantity,
        })),
        totalPrice: cart.totalPrice,
      }
    : undefined;

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        const response = await getCheckoutHistory();
        setCheckoutHistory(response.data || []);
      } catch (err: any) {
        console.error("Error fetching checkout history:", err);
        setError("Unable to load checkout history");
      }
    };

    fetchCheckoutHistory();
  }, []);

  const copyToClipboard = useCallback((text: string) => {
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
  }, []);

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

      if (verificationData) {
        Swal.fire({
          title: "Payment Verified!",
          text: "Your payment was successful!",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });

        // Refresh checkout history
        try {
          const historyResponse = await getCheckoutHistory();
          // Prepend the new checkout to existing history
          setCheckoutHistory((prev) => [verificationData, ...prev]);
        } catch (historyError) {
          console.error("Error refreshing history:", historyError);
          // Just add the new checkout locally
          setCheckoutHistory((prev) => [verificationData, ...prev]);
        }

        resetCheckout();

        if (updateCartCount) {
          await updateCartCount();
        }

        setTimeout(() => {
          router.push(`/checkout/${verificationData._id}?success=true`);
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to verify payment",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim() || !selectedPaymentMethod) {
      setError("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const checkoutData = await initializeCheckout(
        shippingAddress.trim(),
        selectedPaymentMethod
      );

      // Update store
      setPaymentReference(checkoutData.reference || "");
      setAuthorizationUrl(checkoutData.authorizationUrl || "");
      setActiveStep(2);

      if (
        selectedPaymentMethod === "paystack" &&
        checkoutData.authorizationUrl
      ) {
        Swal.fire({
          title: "Redirecting to Paystack",
          html: `
          <div class="text-center">
            <p class="mb-4">You will be redirected to Paystack to complete your payment.</p>
            <p class="text-sm text-zinc-400">
              After payment, you'll be redirected back to this page automatically.
            </p>
          </div>
        `,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Continue to Paystack",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          background: "#0a0a0a",
          color: "#fff",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect in the SAME tab
            window.location.href = checkoutData.authorizationUrl;
          }
        });
      }
    } catch (error: any) {
      console.error("Error initializing checkout:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to initialize checkout",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCheckout = async (checkoutId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your checkout and you'll need to start over",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await cancelCheckout(checkoutId);

        // Update local state - mark as cancelled
        setCheckoutHistory((prev) =>
          prev.map((item) =>
            item._id === checkoutId ? { ...item, status: "cancelled" } : item
          )
        );

        Swal.fire({
          title: "Cancelled!",
          text: "Your checkout has been cancelled.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to cancel checkout",
          icon: "error",
          background: "#0a0a0a",
          color: "#fff",
        });
      }
    }
  };

  return {
    shippingAddress,
    setShippingAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentReference,
    authorizationUrl,
    checkoutHistory,
    isLoading,
    isVerifying,
    activeStep,
    setActiveStep,
    copied,
    error,
    cartData,
    handleVerifyPayment,
    handleCheckout,
    handleCancelCheckout,
    copyToClipboard,
    showAllOrders,
    setShowAllOrders,
  };
};
