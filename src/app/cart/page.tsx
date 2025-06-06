"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, X } from "lucide-react"
import { getCart, deleteCartItem, updateCartQuantity, clearCart } from "@/api/cart/requests"
import { formatPrice } from "@/utils/formatPrice"
import Swal from "sweetalert2"
import { useCart } from "@/context/CartContext"
import { CartSkeleton } from "@/components/cart/CartSkeleton"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface CartProduct {
  _id: string
  name: string
  price: number
  images: string[]
}

interface CartItem {
  product: CartProduct | null
  quantity: number
}

interface CartData {
  products: CartItem[]
  totalPrice: number
}

const FALLBACK_IMAGE = "/placeholder.svg"

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { updateCartCount } = useCart()
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    document.body.style.overflowX = "hidden"

    return () => {
      document.body.style.overflowX = "auto"
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCartData(data)
      } catch (err) {
        setError("Failed to load cart")
        console.error("Error fetching cart:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    try {
      await updateCartQuantity(productId, newQuantity)
      const updatedCart = await getCart()
      setCartData(updatedCart)
      await updateCartCount()
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to update quantity",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      })
    }
  }

  const handleDeleteItem = async (productId: string) => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22d3ee",
        cancelButtonColor: "#EF4444",
        confirmButtonText: "Yes, delete it!",
        background: "#1f2937",
        color: "#fff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCartItem(productId)
          const updatedCart = await getCart()
          setCartData(updatedCart)
          await updateCartCount()
          Swal.fire({
            title: "Deleted!",
            text: "Item has been removed.",
            icon: "success",
            background: "#1f2937",
            color: "#fff",
          })
        }
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete item",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      })
    }
  }

  const handleClearCart = async () => {
    try {
      await Swal.fire({
        title: "Clear entire cart?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#22d3ee",
        cancelButtonColor: "#EF4444",
        confirmButtonText: "Yes, clear it!",
        background: "#1f2937",
        color: "#fff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await clearCart()
          setCartData({ products: [], totalPrice: 0 })
          await updateCartCount()
          Swal.fire({
            title: "Cleared!",
            text: "Your cart has been cleared.",
            icon: "success",
            background: "#1f2937",
            color: "#fff",
          })
        }
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to clear cart",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      })
    }
  }

  if (isLoading) {
    return <CartSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

        <div className="text-center px-4 relative z-10">
          <div className="text-red-400 text-lg font-medium mb-4">{error}</div>
          <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = cartData?.totalPrice || 0
  const shipping = 2000 // Set your shipping cost
  const tax = subtotal * 0.075 // 7.5% VAT
  const total = subtotal + shipping + tax

  // Add this helper function
  const calculateItemPrice = (item: CartItem) => {
    if (!item.product) return 0
    return (item.product.price || 0) * item.quantity
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Shopping Cart
            {cartData && cartData.products.length > 0 && (
              <span className="ml-2 text-lg hidden md:block sm:text-xl font-normal text-white/70">
                ({cartData.products.length} {cartData.products.length === 1 ? "item" : "items"})
              </span>
            )}
          </h1>

          {cartData && cartData.products.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 cursor-pointer hover:bg-red-900/20 hidden"
              onClick={handleClearCart}
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </motion.div>

        {!cartData || cartData.products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
              <ShoppingBag className="mx-auto h-16 w-16 text-cyan-400/70 mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">Your cart is empty</h2>
              <p className="text-white/70 mb-8 text-sm sm:text-base">
                Discover amazing products and add them to your cart
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
              >
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {/* Cart Items */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-4">
              {/* Mobile Clear All Button */}
              <div className="hidden justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 cursor-pointer hover:bg-red-900/20"
                  onClick={handleClearCart}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>

              {cartData.products.map((item, index) => (
                <motion.div
                  key={item.product?._id || `temp-id-${index}`}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <CardContent className="mt-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative h-32 w-full sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-black/20">
                        <Image
                          src={item.product?.images?.[0] || FALLBACK_IMAGE}
                          alt={item.product?.name || "Product image"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-white text-sm sm:text-base leading-tight pr-2">
                            {item.product?.name || "Unavailable Product"}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 cursor-pointer hover:bg-red-900/20 p-1 h-8 w-8 flex-shrink-0"
                            onClick={() => handleDeleteItem(item.product?._id || "")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-sm text-cyan-300 mb-4">₦{formatPrice(item.product?.price || 0)} each</div>

                        {/* Quantity and Price Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/70 mr-2">Qty:</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 p-0 cursor-pointer bg-white/10 border-white/20 hover:bg-white/20 text-white"
                              onClick={() => {
                                const newQuantity = Math.max(1, item.quantity - 1)
                                handleQuantityUpdate(item.product?._id || "", newQuantity)
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              className="w-14 h-8 text-center text-sm bg-white/10 border-white/20 text-white"
                              min="1"
                              onChange={(e) => {
                                const newQuantity = Number.parseInt(e.target.value) || 1
                                handleQuantityUpdate(item.product?._id || "", newQuantity)
                              }}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 p-0 cursor-pointer bg-white/10 border-white/20 hover:bg-white/20 text-white"
                              onClick={() => handleQuantityUpdate(item.product?._id || "", item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Item Total Price */}
                          <div className="text-right">
                            <div className="font-semibold text-lg text-cyan-300">
                              ₦{formatPrice(calculateItemPrice(item))}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-white/50">
                                {item.quantity} × ₦{formatPrice(item.product?.price || 0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </div>

            {/* Order Summary - Sticky on desktop */}
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

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r text-sm from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 border-none"
                    asChild
                    size="lg"
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full text-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                    asChild
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20 sm:hidden"
                    onClick={handleClearCart}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-xs text-white/50 text-center">
                    <p>✓ Secure checkout</p>
                    <p>✓ Free returns within 30 days</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}
