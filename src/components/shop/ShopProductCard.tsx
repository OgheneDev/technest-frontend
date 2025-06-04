import { motion } from 'framer-motion'
import Image from 'next/image'
import { Product } from '@/types/products'
import { Button } from '../ui/button'
import { StarRating } from './StarRating'
import { formatPrice } from '@/utils/formatPrice'
import { useState } from 'react'
import { ShoppingCart, Heart, Loader2, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist } from '@/api/wishlist/requests'
import Swal from 'sweetalert2'

interface ShopProductCardProps {
  product: Product
  layout: 'grid' | 'list'
}

export const ShopProductCard = ({ product, layout }: ShopProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { updateCartCount } = useCart()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleAuthRequired = (action: 'cart' | 'wishlist') => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Authentication Required',
        text: `Please login to add items to your ${action}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#4F46E5',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login')
        }
      })
      return false
    }
    return true
  }

  const handleAddToCart = async () => {
    if (!handleAuthRequired('cart')) return

    setIsAddingToCart(true)
    try {
      const cartItem = { productId: product._id, quantity: 1 }
      await addToCart(cartItem)
      updateCartCount()
      Swal.fire('Added to cart', '', 'success')
    } catch (error) {
      console.error('Error adding to cart:', error)
      Swal.fire('Error', 'Could not add to cart', 'error')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistClick = async () => {
    if (!handleAuthRequired('wishlist')) return

    setIsInWishlist((prev) => !prev)
    const action = isInWishlist ? removeFromWishlist : addToWishlist
    const successMessage = isInWishlist ? 'Removed from wishlist' : 'Added to wishlist'

    try {
      await action(product._id)
      Swal.fire(successMessage, '', 'success')
    } catch (error) {
      console.error('Wishlist action error:', error)
      setIsInWishlist((prev) => !prev) // Revert state on error
      Swal.fire('Error', 'Could not update wishlist', 'error')
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))
  }

  return layout === 'grid' ? (
    <motion.div layout className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
        <div className="absolute top-2 right-2 space-y-2">
          {/* Wishlist and Quick Actions */}
          <Button
            size="icon"
            variant="outline"
            className="bg-white/80 backdrop-blur-sm"
            onClick={handleWishlistClick}
          >
            <Heart className={isInWishlist ? 'fill-rose-500 text-rose-500' : ''} />
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
        </div>
        <p className="text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex items-center gap-2 text-sm"
          >
            {isAddingToCart ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
            Add to cart
          </Button>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div 
      layout
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="flex gap-6 p-4">
        {/* List View Image */}
        <div className="relative w-48 h-48">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* List View Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-rose-50"
              onClick={handleWishlistClick}
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${
                  isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                }`} 
              />
            </Button>
          </div>

          <div className="flex items-end justify-between mt-auto">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-indigo-600">
                ₦{formatPrice(product.price)}
              </p>
              <p className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock < 1}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              {isAddingToCart ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
