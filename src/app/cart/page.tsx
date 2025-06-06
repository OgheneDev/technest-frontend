'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2, X } from "lucide-react"
import { getCart, deleteCartItem, updateCartQuantity, clearCart } from '@/api/cart/requests'
import { formatPrice } from '@/utils/formatPrice'
import Swal from 'sweetalert2'
import { useCart } from '@/context/CartContext'
import { CartSkeleton } from '@/components/cart/CartSkeleton'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

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

const FALLBACK_IMAGE = '/placeholder.svg';

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
        setError('Failed to load cart');
        console.error('Error fetching cart:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    try {
      await updateCartQuantity(productId, newQuantity);
      const updatedCart = await getCart();
      setCartData(updatedCart);
      await updateCartCount();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to update quantity',
        icon: 'error',
      });
    }
  };

  const handleDeleteItem = async (productId: string) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCartItem(productId);
          const updatedCart = await getCart();
          setCartData(updatedCart);
          await updateCartCount();
          Swal.fire('Deleted!', 'Item has been removed.', 'success');
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete item',
        icon: 'error',
      });
    }
  };

  const handleClearCart = async () => {
    try {
      await Swal.fire({
        title: 'Clear entire cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Yes, clear it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await clearCart();
          setCartData({ products: [], totalPrice: 0 });
          await updateCartCount();
          Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to clear cart',
        icon: 'error',
      });
    }
  };

  if (isLoading) {
    return <CartSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
          <Button asChild variant="outline">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = cartData?.totalPrice || 0;
  const shipping = 2000; // Set your shipping cost
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping + tax;

  // Add this helper function
  const calculateItemPrice = (item: CartItem) => {
    if (!item.product) return 0;
    return (item.product.price || 0) * item.quantity;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shopping Cart
            {cartData && cartData.products.length > 0 && (
              <span className="ml-2 text-lg hidden md:block sm:text-xl font-normal text-gray-500">
                ({cartData.products.length} {cartData.products.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
          
          {cartData && cartData.products.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500  hover:text-red-700 cursor-pointer hover:bg-red-50 hidden"
              onClick={handleClearCart}
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {!cartData || cartData.products.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">Discover amazing products and add them to your cart</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-4">
              {/* Mobile Clear All Button */}
              <div className="hidden  justify-end mb-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50"
                  onClick={handleClearCart}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>

              {cartData.products.map((item) => (
                <Card key={item.product?._id || 'temp-id'} className="hover:shadow-md transition-shadow">
                  <CardContent className="mt-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative h-32 w-full sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image 
                          src={item.product?.images?.[0] || FALLBACK_IMAGE} 
                          alt={item.product?.name || 'Product image'} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight pr-2">
                            {item.product?.name || 'Unavailable Product'}
                          </h3>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 p-1 h-8 w-8 flex-shrink-0"
                            onClick={() => handleDeleteItem(item.product?._id || '')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-4">
                          ₦{formatPrice(item.product?.price || 0)} each
                        </div>

                        {/* Quantity and Price Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Qty:</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 p-0 cursor-pointer"
                              onClick={() => {
                                const newQuantity = Math.max(1, item.quantity - 1);
                                handleQuantityUpdate(item.product?._id || '', newQuantity);
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input 
                              type="number" 
                              value={item.quantity} 
                              className="w-14 h-8 text-center text-sm" 
                              min="1" 
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                handleQuantityUpdate(item.product?._id || '', newQuantity);
                              }}
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 p-0 cursor-pointer"
                              onClick={() => handleQuantityUpdate(item.product?._id || '', item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Item Total Price */}
                          <div className="text-right">
                            <div className="font-semibold text-lg text-gray-900">
                              ₦{formatPrice(calculateItemPrice(item))}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-gray-500">
                                {item.quantity} × ₦{formatPrice(item.product?.price || 0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary - Sticky on desktop */}
            <div className="lg:col-span-1 xl:col-span-1">
              <Card className="lg:sticky lg:top-6">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">₦{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">₦{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">VAT (7.5%)</span>
                      <span className="font-medium text-gray-900">₦{formatPrice(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-gray-900 font-semibold text-base sm:text-lg">
                      <span>Total</span>
                      <span>₦{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r text-sm from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-3" 
                      asChild
                      size="lg"
                    >
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full text-sm"
                      asChild
                    >
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 sm:hidden"
                      onClick={handleClearCart}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      <p>✓ Secure checkout</p>
                      <p>✓ Free returns within 30 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}