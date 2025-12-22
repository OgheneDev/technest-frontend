"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  initializeCheckout,
  verifyPayment,
  getCheckoutHistory,
} from "@/api/checkout/requests";
import { useCart } from "@/context/CartContext";
import { CheckoutHistory, CartData } from "@/types/checkout";

export const useCheckoutOperations = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const router = useRouter();
  const { cart, updateCartCount } = useCart();

  const cartData = cart as CartData | undefined;

  useEffect(() => {
    const fetchCheckoutHistory = async () => {
      try {
        const history = await getCheckoutHistory();
        setCheckoutHistory(history);
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

  return {
    shippingAddress,
    setShippingAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentReference,
    checkoutHistory,
    isLoading,
    isVerifying,
    activeStep,
    setActiveStep,
    copied,
    error,
    cartData,
    handleCheckout,
    handleVerifyPayment,
    copyToClipboard,
    showAllOrders,
    setShowAllOrders,
  };
};
