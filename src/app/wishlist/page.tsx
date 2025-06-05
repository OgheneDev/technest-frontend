'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Loader2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWishlist } from '@/api/wishlist/requests'
import { addToCart } from '@/api/cart/requests'
import { formatPrice } from '@/utils/formatPrice'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import Swal from 'sweetalert2'

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
}

interface WishlistItem {
  product: WishlistProduct;
}

interface WishlistData {
  products: WishlistItem[];
}

export default function WishlistPage() {
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { updateCartCount } = useCart()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        if (data && data.products) {
          // Ensure we're getting populated product data
          const validProducts = data.products.filter((item: WishlistItem) => item.product);
          setWishlistData({ products: validProducts });
        } else {
          setWishlistData({ products: [] });
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setWishlistData({ products: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [])

  const handleAddToCart = async (product: WishlistProduct) => {
    if (addingToCart) return
    setAddingToCart(product._id)

    try {
      await addToCart({ productId: product._id, quantity: 1 })
      await updateCartCount()
      Swal.fire({
        title: 'Success!',
        text: 'Item added to cart',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to add to cart',
        icon: 'error',
        confirmButtonColor: '#4F46E5'
      })
    } finally {
      setAddingToCart(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link 
              href="/shop" 
              className="inline-flex items-center text-sm text-indigo-600 font-medium hover:text-indigo-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          {/* Simplified Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Wishlist</h1>
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-sm text-gray-500">
              {wishlistData?.products.length || 0} {wishlistData?.products.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Wishlist Grid */}
          {!wishlistData?.products.length ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Start adding items you love!</p>
              <Button asChild>
                <Link href="/shop">Explore Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {wishlistData.products.map(({ product }) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-indigo-600">
                          ₦{formatPrice(product.price)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={addingToCart === product._id}
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}
