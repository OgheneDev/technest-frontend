'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/products'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Star, Minus, Plus, ShoppingCart, Heart, Loader2, Package, RefreshCw, Truck } from 'lucide-react'
import { formatPrice } from '@/utils/formatPrice'
import { motion } from 'framer-motion'
import { addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist } from '@/api/wishlist/requests'
import { useCart } from '@/context/CartContext'
import { useAuthStore } from '@/store/useAuthStore'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { getWishlist } from '@/api/wishlist/requests'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false)
  const { updateCartCount } = useCart()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated) return
      try {
        const wishlistData = await getWishlist()
        setIsInWishlist(wishlistData.products.some(
          (item: any) => item.product._id === product._id
        ))
      } catch (error) {
        console.error('Error checking wishlist:', error)
      }
    }
    checkWishlistStatus()
  }, [product._id, isAuthenticated])

  const handleAuthRequired = async (action: 'cart' | 'wishlist') => {
    if (!isAuthenticated) {
      const result = await Swal.fire({
        title: 'Authentication Required',
        text: `Please login to add items to your ${action}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        confirmButtonColor: '#4F46E5'
      })
      if (result.isConfirmed) {
        router.push('/login')
      }
      return false
    }
    return true
  }

  const handleAddToCart = async () => {
    if (!await handleAuthRequired('cart')) return
    
    setIsAddingToCart(true)
    try {
      await addToCart({ productId: product._id, quantity })
      await updateCartCount()
      Swal.fire({
        title: 'Added to cart!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to add to cart',
        icon: 'error'
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (!await handleAuthRequired('wishlist')) return
    if (isUpdatingWishlist) return

    setIsUpdatingWishlist(true)
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id)
        setIsInWishlist(false)
      } else {
        await addToWishlist(product._id)
        setIsInWishlist(true)
      }
    } catch (error) {
      console.error('Wishlist error:', error)
    } finally {
      setIsUpdatingWishlist(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Category & Title */}
      <div>
        <Badge variant="outline" className="mb-2 text-gray-700">
          {product.category}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {product.name}
        </h1>
      </div>

      {/* Rating & Stock Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            ({product.rating.toFixed(1)} rating)
          </div>
        </div>
        <Badge variant={product.stock > 0 ? "default" : "secondary"}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      {/* Price & Quantity */}
      <div className="space-y-4">
        <div className="text-3xl font-bold text-indigo-600">
          ₦{formatPrice(product.price)}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className='cursor-pointer'
            >
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center border rounded-md text-gray-700"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= product.stock}
              className='cursor-pointer'
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="flex-1 cursor-pointer text-sm"
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock < 1}
        >
          {isAddingToCart ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <ShoppingCart className="h-5 w-5 mr-2" />
          )}
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleWishlistToggle}
          disabled={isUpdatingWishlist}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </Button>
      </div>

      {/* Delivery Info */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="h-5 w-5" />
          <span>Free delivery on orders over ₦100,000</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RefreshCw className="h-5 w-5" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="h-5 w-5" />
          <span>Same-day dispatch for orders before 2pm</span>
        </div>
      </div>
    </div>
  )
}
