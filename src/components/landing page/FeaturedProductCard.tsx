import React, { useState } from 'react'
import { Product } from '@/types/products'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { ShoppingCart, Loader2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { getCart, addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist } from '@/api/wishlist/requests'
import Swal from 'sweetalert2'
import { AddToCartParams } from '@/types/cart';
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'

interface FeaturedProductCardProps {
    product: Product
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({product}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { updateCartCount } = useCart();

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    if (product.stock < 1) {
      Swal.fire({
        title: 'Out of Stock',
        text: 'This item is currently unavailable',
        icon: 'error',
        confirmButtonColor: '#4F46E5'
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      const currentCart = await getCart();
      const existingItem = currentCart.products.find(
        (item: { product: string | { _id: string }, quantity: number }) => {
          // Handle both populated and unpopulated product references
          const productId = typeof item.product === 'string' 
            ? item.product 
            : item.product?._id;
          return productId === product._id;
        }
      );

      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      // Check if requested quantity is available
      if (newQuantity > product.stock) {
        Swal.fire({
          title: 'Stock Limit Reached',
          text: 'Cannot add more of this item',
          icon: 'warning',
          confirmButtonColor: '#4F46E5'
        });
        return;
      }

      const cartData: AddToCartParams = {
        productId: product._id,
        quantity: newQuantity
      };

      await addToCart(cartData);
      await updateCartCount();
      Swal.fire({
        title: 'Success!',
        text: existingItem ? 'Cart quantity updated' : 'Item added to cart',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      if (errorMessage.includes('quantity not available')) {
        Swal.fire({
          title: 'Not Enough Stock',
          text: 'The requested quantity is not available',
          icon: 'error',
          confirmButtonColor: '#4F46E5'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#4F46E5'
        });
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistClick = async () => {
    if (isUpdatingWishlist) return;
    
    setIsUpdatingWishlist(true);
    try {
      if (isInWishlist) {
        const result = await removeFromWishlist(product._id);
        if (result) {
          setIsInWishlist(false);
          Swal.fire({
            title: 'Removed',
            text: 'Item removed from wishlist',
            icon: 'success',
            confirmButtonColor: '#4F46E5',
            timer: 2000,
            showConfirmButton: false
          });
        }
      } else {
        const result = await addToWishlist(product._id);
        if (result) {
          setIsInWishlist(true);
          Swal.fire({
            title: 'Added',
            text: 'Item added to wishlist',
            icon: 'success',
            confirmButtonColor: '#4F46E5',
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update wishlist';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#4F46E5'
      });
      // Reset state if operation failed
      setIsInWishlist(prev => prev);
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden md:w-[300px] bg-white hover:shadow-xl transition-shadow duration-300">
        <motion.div 
          className="relative aspect-square cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 transition-opacity"
          />
          <Badge 
            className="absolute right-2 top-2 bg-green-500 text-white shadow-lg"
          >
            New
          </Badge>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
          >
            <p className="text-white text-sm font-medium truncate">
              {product.name}
            </p>
          </motion.div>
        </motion.div>

        <CardContent className="mt-4 bg-white">
          <motion.div layout className="space-y-2">
            <motion.h3 
              className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors"
            >
              {product.name}
            </motion.h3>
            <div className="flex items-center justify-between">
              <motion.span 
                className="font-bold text-lg bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                ₦{formatPrice(product.price)}
              </motion.span>
              <div className='flex items-center gap-5'>
                <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm" 
                  className="rounded-full cursor-pointer p-2 bg-gray-50 hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock < 1}
                >
                  {isAddingToCart ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4" />
                  )}
                  <span className="sr-only">Add to cart</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm" 
                  className="rounded-full cursor-pointer p-2 bg-gray-50 hover:bg-rose-100 transition-colors"
                  onClick={handleWishlistClick}
                  disabled={isUpdatingWishlist}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-gray-500'
                    } transition-colors`}
                  />
                </Button>
              </motion.div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeaturedProductCard