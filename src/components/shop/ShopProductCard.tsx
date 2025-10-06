import { motion } from 'framer-motion'
import Image from 'next/image'
import { Product } from '@/types/products'
import { Button } from '../ui/button'
import { formatPrice } from '@/utils/formatPrice'
import { useState, useEffect } from 'react'
import { showToast } from '@/store/toastStore'
import { ShoppingCart, Heart, Loader2, Star, Eye, Zap } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist, getWishlist } from '@/api/wishlist/requests'
import Swal from 'sweetalert2'

interface ShopProductCardProps {
  product: Product
  layout: 'grid' | 'list'
}

export const ShopProductCard = ({ product, layout }: ShopProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { updateCartCount } = useCart()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  // Add useEffect for initial wishlist check
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated) return
      
      try {
        const wishlistData = await getWishlist()
        const isProductInWishlist = wishlistData.products.some(
          (item: any) => item.product._id === product._id
        )
        setIsInWishlist(isProductInWishlist)
      } catch (error) {
        console.error('Error checking wishlist status:', error)
      }
    }

    checkWishlistStatus()
  }, [product._id, isAuthenticated])

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
      showToast('Added to cart: ' + product.name, 'success', 2500)
    } catch (error) {
      console.error('Error adding to cart:', error)
      showToast(error instanceof Error ? error.message : 'Could not add to cart', 'error', 3500)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistClick = async () => {
    if (!handleAuthRequired('wishlist')) return

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
      const errorMessage = error instanceof Error ? error.message : 'Failed to update wishlist'
      showToast(errorMessage, 'error', 3500)
      setIsInWishlist(prev => !prev)
    } finally {
      setIsUpdatingWishlist(false)
    }
  }

  const handleQuickView = () => {
    router.push(`/products/${product._id}`)
  } 

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-3.5 w-3.5 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))
  }

  const isOutOfStock = product.stock < 1
  const isLowStock = product.stock > 0 && product.stock <= 5

  return (
    <>
      {layout === 'grid' ? (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden">
            {/* Product Image */}
            <div className={`absolute inset-0 bg-black/20 ${imageLoaded ? 'hidden' : ''}`} />
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-transform cursor-pointer duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Stock badges */}
            {isOutOfStock && (
              <div className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                Out of Stock
              </div>
            )}
            {isLowStock && (
              <div className="absolute top-3 left-3 bg-orange-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Only {product.stock} left
              </div>
            )}
            
            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Button
                size="icon"
                variant="default"
                className="bg-white/20 backdrop-blur-sm border border-white/10 hover:bg-white/30 text-white cursor-pointer shadow-lg"
                onClick={handleWishlistClick}
              >
                <Heart className={`h-4 w-4 transition-colors ${
                  isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-blue-800'
                }`} />
              </Button>
              <Button
                size="icon"
                variant="default"
                className="bg-white/20 backdrop-blur-sm border border-white/10 hover:bg-white/30 text-white cursor-pointer shadow-lg"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 text-blue-800" />
              </Button>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-cyan-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-xs text-white/50 ml-1">({product.rating.toFixed(1)})</span>
              </div>
              <span className="text-lg font-bold text-cyan-400">
                ₦{formatPrice(product.price)}
              </span>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || isOutOfStock}
              className={`w-full transition-all duration-300 cursor-pointer text-sm ${
                isOutOfStock 
                  ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed border border-gray-700' 
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white hover:border-cyan-500/50'
              }`}
            >
              {isAddingToCart ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <ShoppingCart className="h-4 w-4 mr-2" />
              )}
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="group bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row gap-4 p-4">
            {/* Image - Responsive */}
            <div className="relative w-full sm:w-48 h-48 sm:h-48 flex-shrink-0">
              <div className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg ${imageLoaded ? 'hidden' : ''}`} />
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover rounded-lg transition-transform cursor-pointer duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Stock badges */}
              {isOutOfStock && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Out of Stock
                </div>
              )}
              {isLowStock && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {product.stock} left
                </div>
              )}
            </div>

            {/* Content - Responsive */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
                
                {/* Wishlist button - Desktop */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden sm:flex cursor-pointer hover:bg-rose-50 flex-shrink-0"
                  onClick={handleWishlistClick}
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors  ${
                      isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'
                    }`} 
                  />
                </Button>
              </div>

              {/* Bottom section - Price and Actions */}
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                      ₦{formatPrice(product.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    {/* Mobile wishlist button */}
                    <Button
                      size="icon"
                      variant="outline"
                      className="sm:hidden cursor-pointer flex-shrink-0"
                      onClick={handleWishlistClick}
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors ${
                          isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                    
                    {/* Quick view button */}
                    <Button
                      size="icon"
                      variant="outline"
                      className="flex-shrink-0 cursor-pointer"
                      onClick={handleQuickView}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {/* Add to cart button */}
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || isOutOfStock}
                      className={`flex-1 sm:flex-initial text-sm cursor-pointer transition-all duration-300 ${
                        isOutOfStock 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      }`}
                    >
                      {isAddingToCart ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          <span className="hidden sm:inline">Add to Cart</span>
                          <span className="sm:hidden">Add</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ...global toast used via showToast() — no local Toast render required */}
    </>
  )
}