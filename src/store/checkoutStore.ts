"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutStore {
  activeStep: number;
  shippingAddress: string;
  selectedPaymentMethod: string;
  paymentReference: string;
  authorizationUrl: string;
  setActiveStep: (step: number) => void;
  setShippingAddress: (address: string) => void;
  setSelectedPaymentMethod: (method: string) => void;
  setPaymentReference: (reference: string) => void;
  setAuthorizationUrl: (url: string) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      activeStep: 1,
      shippingAddress: "",
      selectedPaymentMethod: "paystack",
      paymentReference: "",
      authorizationUrl: "",
      setActiveStep: (step) => set({ activeStep: step }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setSelectedPaymentMethod: (method) =>
        set({ selectedPaymentMethod: method }),
      setPaymentReference: (reference) => set({ paymentReference: reference }),
      setAuthorizationUrl: (url) => set({ authorizationUrl: url }),
      resetCheckout: () =>
        set({
          activeStep: 1,
          shippingAddress: "",
          selectedPaymentMethod: "paystack",
          paymentReference: "",
          authorizationUrl: "",
        }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
