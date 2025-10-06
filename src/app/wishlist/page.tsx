"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Loader2, ShoppingCart, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getWishlist } from "@/api/wishlist/requests"
import { addToCart } from "@/api/cart/requests"
import { formatPrice } from "@/utils/formatPrice"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import Swal from "sweetalert2"
import { WishlistSkeleton } from "@/components/wishlist/WishlistSkeleton"

interface WishlistProduct {
  _id: string
  name: string
  price: number
  images: string[]
  stock: number
}

interface WishlistItem {
  product: WishlistProduct
}

interface WishlistData {
  products: WishlistItem[]
}

export default function WishlistPage() {
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
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
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist()
        if (data && data.products) {
          // Ensure we're getting populated product data
          const validProducts = data.products.filter((item: WishlistItem) => item.product)
          setWishlistData({ products: validProducts })
        } else {
          setWishlistData({ products: [] })
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error)
        setWishlistData({ products: [] })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleAddToCart = async (product: WishlistProduct) => {
    if (addingToCart) return
    setAddingToCart(product._id)

    try {
      await addToCart({ productId: product._id, quantity: 1 })
      await updateCartCount()
      Swal.fire({
        title: "Success!",
        text: "Item added to cart",
        icon: "success",
        confirmButtonColor: "#4F46E5",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to add to cart",
        icon: "error",
        confirmButtonColor: "#4F46E5",
      })
    } finally {
      setAddingToCart(null)
    }
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

  if (isLoading) {
    return <WishlistSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      {/* Navigation Bar */}
      <div className="z-20 bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-cyan-300 text-[12px] uppercase font-medium mb-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
            My Wishlist ({wishlistData?.products.length || 0}{" "}
            {wishlistData?.products.length === 1 ? "item" : "items"})
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Saved Items
          </h1>
        </motion.div>

        {/* Wishlist Grid */}
        {!wishlistData?.products.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 max-w-md mx-auto"
          >
            <Heart className="mx-auto h-12 w-12 text-pink-400/70 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Your wishlist is empty</h3>
            <p className="text-white/70 mb-6">Start adding items you love!</p>
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
            >
              <Link href="/shop">Explore Products</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {wishlistData.products.map(({ product }) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <Link href={`/products/${product._id}`}>
                    <div className="relative aspect-square">
                     <Image
                       src={product.images[0] || "/placeholder.svg"}
                       alt={product.name}
                       fill
                       className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-300">₦{formatPrice(product.price)}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart === product._id}
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        {addingToCart === product._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-4 w-4" />
                        )}
                        <span className="ml-2">Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  )
}
