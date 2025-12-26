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
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function CheckoutPage() {
  const {
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
    handleCheckout,
    handleVerifyPayment,
    handleCancelCheckout,
    handleMakePayment,
    copyToClipboard,
    showAllOrders,
    setShowAllOrders,
    confirmationModal,
    closeConfirmationModal,
  } = useCheckoutOperations();

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

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Column - Forms */}
          <div className="flex flex-col gap-6">
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
                  authorizationUrl={authorizationUrl}
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
              onCancelCheckout={handleCancelCheckout}
              onMakePayment={handleMakePayment}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartData={cartData as any}
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>
      </main>

      <CheckoutFooter />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        variant={confirmationModal.variant}
        confirmText={
          confirmationModal.variant === "info"
            ? "Continue to Paystack"
            : "Yes, cancel it"
        }
        cancelText={
          confirmationModal.variant === "info" ? "Go Back" : "No, keep it"
        }
      />
    </div>
  );
}
