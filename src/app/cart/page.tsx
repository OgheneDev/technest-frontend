"use client";

import { useEffect } from "react";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { useCartOperations } from "@/hooks/useCartOperations";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { EmptyCartState } from "@/components/cart/EmptyCartState";
import { LoadingErrorState } from "@/components/cart/LoadingErrorState";
import { OrderSummary } from "@/components/cart/OrderSummary";

export default function CartPage() {
  const {
    cartData,
    isLoading,
    error,
    fetchCart,
    handleQuantityUpdate,
    handleDeleteItem,
    handleClearCart,
  } = useCartOperations();

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <LoadingErrorState error={error} />;
  }

  const itemCount = cartData?.products.length || 0;
  const subtotal = cartData?.totalPrice || 0;
  const shipping = 2000;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      <CartHeader itemCount={itemCount} onClearCart={handleClearCart} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-5">
        {itemCount === 0 ? (
          <EmptyCartState />
        ) : (
          cartData && (
            <div className="grid lg:grid-cols-3 gap-8">
              <CartItemsList
                cartData={cartData}
                onQuantityUpdate={handleQuantityUpdate}
                onDeleteItem={handleDeleteItem}
              />
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
