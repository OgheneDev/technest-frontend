"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  X,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import {
  getCart,
  deleteCartItem,
  updateCartQuantity,
  clearCart,
} from "@/api/cart/requests";
import { formatPrice } from "@/utils/formatPrice";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: CartProduct | null;
  quantity: number;
}

interface CartData {
  products: CartItem[];
  totalPrice: number;
}

const FALLBACK_IMAGE = "/placeholder.svg";

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (err) {
        setError("Failed to load cart");
        console.error("Error fetching cart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await updateCartQuantity(productId, newQuantity);
      const updatedCart = await getCart();
      setCartData(updatedCart);
      await updateCartCount();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error ? error.message : "Failed to update quantity",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
      });
    }
  };

  const handleDeleteItem = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteCartItem(productId);
        const updatedCart = await getCart();
        setCartData(updatedCart);
        await updateCartCount();
        Swal.fire({
          title: "Deleted!",
          text: "Item has been removed.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete item",
          icon: "error",
          background: "#0a0a0a",
          color: "#fff",
        });
      }
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Clear entire cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, clear it!",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await clearCart();
        setCartData({ products: [], totalPrice: 0 });
        await updateCartCount();
        Swal.fire({
          title: "Cleared!",
          text: "Your cart has been cleared.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to clear cart",
          icon: "error",
          background: "#0a0a0a",
          color: "#fff",
        });
      }
    }
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-400 text-lg font-medium mb-4">{error}</div>
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const itemCount = cartData?.products.length || 0;
  const subtotal = cartData?.totalPrice || 0;
  const shipping = 2000;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  const calculateItemPrice = (item: CartItem) => {
    if (!item.product) return 0;
    return (item.product.price || 0) * item.quantity;
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      {/* Navigation */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium tracking-wide mb-4">
            <ShoppingCart className="h-3 w-3 mr-2" />
            SHOPPING CART
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Your <span className="text-emerald-400">Cart</span>
                {itemCount > 0 && (
                  <span className="ml-2 text-lg font-normal text-zinc-400">
                    ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                )}
              </h1>
              <p className="text-zinc-400 mt-1">
                {itemCount > 0
                  ? "Review and checkout your items"
                  : "Start adding items to your cart"}
              </p>
            </div>

            {itemCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                onClick={handleClearCart}
              >
                <X className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {itemCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="relative inline-block mb-6">
              <ShoppingCart className="h-20 w-20 text-emerald-400/20" />
            </div>

            <h2 className="text-xl font-semibold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-zinc-400 mb-8">
              Discover amazing products and add them to your cart
            </p>

            <Button
              asChild
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
              size="lg"
            >
              <Link href="/shop">
                Start Shopping
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Shield className="h-3 w-3 text-emerald-400" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Truck className="h-3 w-3 text-emerald-400" />
                  <span>Free Shipping Over ₦50,000</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Package className="h-3 w-3 text-emerald-400" />
                  <span>Easy Returns</span>
                </div>
              </div>

              {/* Cart Items List */}
              {cartData &&
                cartData.products.map((item, index) => (
                  <motion.div
                    key={item.product?._id || `temp-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="relative h-32 w-full sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                          <Image
                            src={item.product?.images?.[0] || FALLBACK_IMAGE}
                            alt={item.product?.name || "Product"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 96px"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <Link
                              href={`/products/${item.product?._id}`}
                              className="flex-1"
                            >
                              <h3 className="font-semibold text-white hover:text-emerald-300 transition-colors line-clamp-2">
                                {item.product?.name || "Unavailable Product"}
                              </h3>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                              onClick={() =>
                                handleDeleteItem(item.product?._id || "")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-sm text-emerald-400 mb-4">
                            ₦{formatPrice(item.product?.price || 0)} each
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                onClick={() =>
                                  handleQuantityUpdate(
                                    item.product?._id || "",
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                min="1"
                                className="w-16 h-8 text-center bg-zinc-800 border-zinc-700 text-white"
                                onChange={(e) =>
                                  handleQuantityUpdate(
                                    item.product?._id || "",
                                    Number.parseInt(e.target.value) || 1
                                  )
                                }
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                onClick={() =>
                                  handleQuantityUpdate(
                                    item.product?._id || "",
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="font-bold text-lg text-emerald-400">
                                ₦{formatPrice(calculateItemPrice(item))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
                <h2 className="text-xl font-semibold mb-6 text-white">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-white">₦{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-white">₦{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">VAT (7.5%)</span>
                    <span className="text-white">₦{formatPrice(tax)}</span>
                  </div>
                  <Separator className="bg-zinc-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-emerald-400">Total</span>
                    <span className="text-emerald-400">
                      ₦{formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black"
                    asChild
                    size="sm"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 text-sm hover:bg-zinc-800"
                    asChild
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>

                {/* Trust Info */}
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Shield className="h-3 w-3 text-emerald-400" />
                    Secure SSL encryption
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Package className="h-3 w-3 text-emerald-400" />
                    30-day return policy
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Truck className="h-3 w-3 text-emerald-400" />
                    Free shipping on orders over ₦50,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
