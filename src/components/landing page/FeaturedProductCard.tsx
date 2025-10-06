import React, { useState, useEffect } from 'react'
import { Product } from '@/types/products'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { ShoppingCart, Loader2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { getCart, addToCart } from '@/api/cart/requests'
import { addToWishlist, removeFromWishlist, getWishlist } from '@/api/wishlist/requests'
import Swal from 'sweetalert2'
import { AddToCartParams } from '@/types/cart';
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

interface FeaturedProductCardProps {
    product: Product
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({product}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { updateCartCount } = useCart();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAuthRequired = (action: 'cart' | 'wishlist') => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Authentication Required',
        text: `Please login to add items to your ${action}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#06B6D4',
        background: '#1F2937',
        color: '#F9FAFB'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!handleAuthRequired('cart')) return;
    if (isAddingToCart) return;
    
    if (product.stock < 1) {
      Swal.fire({
        title: 'Out of Stock',
        text: 'This item is currently unavailable',
        icon: 'error',
        confirmButtonColor: '#06B6D4',
        background: '#1F2937',
        color: '#F9FAFB'
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      const currentCart = await getCart();
      const existingItem = currentCart.products.find(
        (item: { product: string | { _id: string }, quantity: number }) => {
          const productId = typeof item.product === 'string' 
            ? item.product 
            : item.product?._id;
          return productId === product._id;
        }
      );

      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      if (newQuantity > product.stock) {
        Swal.fire({
          title: 'Stock Limit Reached',
          text: 'Cannot add more of this item',
          icon: 'warning',
          confirmButtonColor: '#06B6D4',
          background: '#1F2937',
          color: '#F9FAFB'
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
        confirmButtonColor: '#06B6D4',
        timer: 2000,
        showConfirmButton: false,
        background: '#1F2937',
        color: '#F9FAFB'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      if (errorMessage.includes('quantity not available')) {
        Swal.fire({
          title: 'Not Enough Stock',
          text: 'The requested quantity is not available',
          icon: 'error',
          confirmButtonColor: '#06B6D4',
          background: '#1F2937',
          color: '#F9FAFB'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#06B6D4',
          background: '#1F2937',
          color: '#F9FAFB'
        });
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated) return;
      
      try {
        const wishlistData = await getWishlist();
        const isProductInWishlist = wishlistData.products.some(
          (item: any) => item.product._id === product._id
        );
        setIsInWishlist(isProductInWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    checkWishlistStatus();
  }, [product._id, isAuthenticated]);

  const handleWishlistClick = async () => {
    if (!handleAuthRequired('wishlist')) return;
    if (isUpdatingWishlist) return;
    
    setIsUpdatingWishlist(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        setIsInWishlist(false);
        Swal.fire({
          title: 'Removed',
          text: 'Item removed from wishlist',
          icon: 'success',
          confirmButtonColor: '#06B6D4',
          timer: 2000,
          showConfirmButton: false,
          background: '#1F2937',
          color: '#F9FAFB'
        });
      } else {
        await addToWishlist(product._id);
        setIsInWishlist(true);
        Swal.fire({
          title: 'Added',
          text: 'Item added to wishlist',
          icon: 'success',
          confirmButtonColor: '#06B6D4',
          timer: 2000,
          showConfirmButton: false,
          background: '#1F2937',
          color: '#F9FAFB'
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update wishlist';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#06B6D4',
        background: '#1F2937',
        color: '#F9FAFB'
      });
      setIsInWishlist(prev => !prev);
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
      <Card className="group relative overflow-hidden md:w-[300px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/[0.15] hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300">
        <Link href={`/products/${product._id}`}>
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
            className="absolute inset-0 bg-black/30 transition-opacity"
          />
          <Badge 
            className="absolute right-2 top-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg border-0"
          >
            New
          </Badge>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <p className="text-white text-sm font-medium truncate">
              {product.name}
            </p>
          </motion.div>
        </motion.div>
        </Link>
        <CardContent className="mt-4 bg-transparent">
          <motion.div layout className="space-y-2">
            <motion.h3 
              className="font-medium text-white line-clamp-1 group-hover:text-cyan-400 transition-colors"
            >
              {product.name}
            </motion.h3>
            <div className="flex items-center justify-between">
              <motion.span 
                className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                ₦{formatPrice(product.price)}
              </motion.span>
              <div className='flex items-center gap-3'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    className="rounded-full cursor-pointer p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-cyan-400 hover:border-cyan-400 hover:text-white transition-all duration-300"
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
                    className="rounded-full cursor-pointer p-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-rose-400 hover:border-rose-400 transition-all duration-300"
                    onClick={handleWishlistClick}
                    disabled={isUpdatingWishlist}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isInWishlist ? 'fill-rose-400 text-rose-400' : 'text-white/70'
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