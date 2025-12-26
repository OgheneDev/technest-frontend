"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  initializeCheckout,
  verifyPayment,
  getCheckoutHistory,
  cancelCheckout,
} from "@/api/checkout/requests";
import { useCart } from "@/context/CartContext";
import { CheckoutHistory } from "@/types/checkout";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useToastStore } from "@/store/useToastStore";

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
  const { showToast } = useToastStore();
  const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

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
        showToast("Unable to load checkout history", "error");
      }
    };

    fetchCheckoutHistory();
  }, [showToast]);

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Reference copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    },
    [showToast]
  );

  const handleVerifyPayment = async () => {
    if (!paymentReference) {
      setError("No payment reference provided");
      showToast("No payment reference provided", "error");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const verificationData = await verifyPayment(paymentReference);

      if (verificationData) {
        showToast("Payment verified successfully!", "success");

        // Refresh checkout history
        try {
          const historyResponse = await getCheckoutHistory();
          setCheckoutHistory((prev) => [verificationData, ...prev]);
        } catch (historyError) {
          console.error("Error refreshing history:", historyError);
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
      showToast(error.message || "Failed to verify payment", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim() || !selectedPaymentMethod) {
      setError("Please fill all required fields");
      showToast("Please fill all required fields", "error");
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
        // Show confirmation modal for Paystack redirect
        setConfirmationModal({
          isOpen: true,
          title: "Redirecting to Paystack",
          message:
            "You will be redirected to Paystack to complete your payment. After payment, you'll be redirected back to this page automatically.",
          variant: "info",
          onConfirm: () => {
            window.location.href = checkoutData.authorizationUrl;
          },
        });
      }
    } catch (error: any) {
      console.error("Error initializing checkout:", error);
      showToast(error.message || "Failed to initialize checkout", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakePayment = async (order: CheckoutHistory) => {
    // Restore the order details to the checkout store
    setShippingAddress(order.shippingAddress || "");
    setSelectedPaymentMethod(order.paymentMethod || "");
    setPaymentReference(order.paymentReference || "");

    // For Paystack payment method, we need to reinitialize checkout to get a fresh authorization URL
    if (order.paymentMethod === "paystack") {
      setIsLoading(true);

      try {
        // Reinitialize checkout with the same details to get a fresh payment link
        const checkoutData = await initializeCheckout(
          order.shippingAddress || "",
          order.paymentMethod
        );

        setPaymentReference(checkoutData.reference || "");
        setAuthorizationUrl(checkoutData.authorizationUrl || "");

        // Move to payment step first
        setActiveStep(2);

        // Show confirmation modal for Paystack redirect (optional - user can click the button in PaymentStep)
        setConfirmationModal({
          isOpen: true,
          title: "Continue to Payment",
          message:
            "Click 'Continue to Paystack' to complete your payment. After payment, return here to verify your transaction.",
          variant: "info",
          onConfirm: () => {
            window.open(checkoutData.authorizationUrl || "", "_blank");
          },
        });

        showToast(
          "Payment initialized. Complete payment and verify here.",
          "success"
        );
      } catch (error: any) {
        console.error("Error reinitializing checkout:", error);
        showToast(error.message || "Failed to initialize payment", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      // For other payment methods, go directly to payment step
      setActiveStep(2);
      showToast("Resuming payment process", "success");
    }
  };

  const handleCancelCheckout = async (checkoutId: string) => {
    setConfirmationModal({
      isOpen: true,
      title: "Are you sure?",
      message: "This will cancel your checkout and you'll need to start over",
      variant: "warning",
      onConfirm: async () => {
        try {
          await cancelCheckout(checkoutId);

          // Update local state - mark as cancelled
          setCheckoutHistory((prev) =>
            prev.map((item) =>
              item._id === checkoutId ? { ...item, status: "cancelled" } : item
            )
          );

          showToast("Your checkout has been cancelled", "success");
        } catch (error: any) {
          showToast(error.message || "Failed to cancel checkout", "error");
        }
      },
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
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
    handleMakePayment,
    copyToClipboard,
    showAllOrders,
    setShowAllOrders,
    confirmationModal,
    closeConfirmationModal,
  };
};
