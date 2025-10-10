'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/products'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Star, Minus, Plus, ShoppingCart, Heart, Loader2, Package, RefreshCw, Truck } from 'lucide-react'
import { formatPrice } from '@/utils/formatPrice'
import { addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist } from '@/api/wishlist/requests'
import { useCart } from '@/context/CartContext'
import { useAuthStore } from '@/store/useAuthStore'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { getWishlist } from '@/api/wishlist/requests'
import { showToast } from '@/store/toastStore'

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
      showToast('Added to cart', 'success', 2500)
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to add to cart', 'error', 3500)
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
        showToast('Removed from wishlist', 'success', 2500)
      } else {
        await addToWishlist(product._id)
        setIsInWishlist(true)
        showToast('Added to wishlist', 'success', 2500)
      }
    } catch (error) {
      console.error('Wishlist error:', error)
      showToast(error instanceof Error ? error.message : 'Wishlist error', 'error', 3500)
    } finally {
      setIsUpdatingWishlist(false)
    }
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-white/20'}`} />
      ))}
    </div>
  )

  return (
    <div className="space-y-6 text-white">
      {/* Category & Title */}
      <div>
        <Badge variant="outline" className="mb-2 text-white/70 border-white/10">
          {product.category}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
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
                    ? 'text-yellow-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-white/70">
            ({product.rating.toFixed(1)} rating)
          </div>
        </div>
        <Badge variant={product.stock > 0 ? 'default' : 'secondary'}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      {/* Price & Quantity */}
      <div className="space-y-4">
        <div className="text-3xl font-bold text-cyan-400">
          ₦{formatPrice(product.price)}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Quantity</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="cursor-pointer bg-white/5 text-white hover:bg-white/10 border-white/10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="relative w-20">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))}
                className="w-full text-center bg-white/5 text-white border border-white/10 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= product.stock}
              className="cursor-pointer bg-white/5 text-white hover:bg-white/10 border-white/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          className="flex-1 cursor-pointer py-3 text-sm bg-cyan-500 text-white hover:bg-cyan-600"
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
          className="bg-white/5 text-white hover:bg-white/10 border-white/10"
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </Button>
      </div>

      {/* Delivery Info */}
      <div className="space-y-4 border-t pt-6 border-white/6">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Package className="h-5 w-5" />
          <span>Free delivery on orders over ₦100,000</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <RefreshCw className="h-5 w-5" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Truck className="h-5 w-5" />
          <span>Same-day dispatch for orders before 2pm</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className='text-white/70 text-sm'>{product.description}</p>
      </div>
    </div>
  )
}