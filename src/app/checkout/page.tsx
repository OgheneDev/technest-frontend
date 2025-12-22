"use client";

import { AnimatePresence } from "framer-motion";
import { useCheckoutOperations } from "@/hooks/useCheckoutOperations";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { ConfirmationStep } from "@/components/checkout/ConfirmationStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { OrderHistory } from "@/components/checkout/OrderHistory";
import { CheckoutFooter } from "@/components/checkout/CheckoutFooter";

export default function CheckoutPage() {
  const {
    shippingAddress,
    setShippingAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentReference,
    authorizationUrl, // Add this
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
    handleCancelCheckout, // Add this
    copyToClipboard,
    showAllOrders,
    setShowAllOrders,
  } = useCheckoutOperations(); // Remove currentPage, totalPages, handleLoadMore

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <CheckoutHeader />

      <main className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        <CheckoutProgress
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Checkout Details */}
              {activeStep === 1 && (
                <CheckoutForm
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  selectedPaymentMethod={selectedPaymentMethod}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  isLoading={isLoading}
                  error={error}
                  onSubmit={handleCheckout}
                />
              )}

              {/* Step 2: Payment */}
              {activeStep === 2 && paymentReference && (
                <PaymentStep
                  paymentReference={paymentReference}
                  authorizationUrl={authorizationUrl} // Pass this
                  selectedPaymentMethod={selectedPaymentMethod}
                  isVerifying={isVerifying}
                  copied={copied}
                  onVerifyPayment={handleVerifyPayment}
                  onCopyToClipboard={copyToClipboard}
                  onBack={() => setActiveStep(1)}
                />
              )}

              {/* Step 3: Confirmation */}
              {activeStep === 3 && <ConfirmationStep />}
            </AnimatePresence>

            <OrderHistory
              checkoutHistory={checkoutHistory}
              activeStep={activeStep}
              showAllOrders={showAllOrders}
              setShowAllOrders={setShowAllOrders}
              onCancelCheckout={handleCancelCheckout} // Add this
              // Remove currentPage, totalPages, and onLoadMore props
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartData={cartData}
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
}
