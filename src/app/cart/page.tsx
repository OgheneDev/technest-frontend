'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react"
import { getCart, deleteCartItem, updateCartQuantity, clearCart } from '@/api/cart/requests'
import { formatPrice } from '@/utils/formatPrice'
import Swal from 'sweetalert2'

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
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
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 py-8 px-8">
        <div className="container">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/shop" className="flex items-center text-sm text-violet-700 font-medium hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {!cartData || cartData.products.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <Button asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-1 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartData.products.map((item) => (
                  <Card key={item.product?._id || 'temp-id'}>
                    <CardContent className="mt-6 text-gray-900">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                          <Image 
                            src={item.product?.images?.[0] || FALLBACK_IMAGE} 
                            alt={item.product?.name || 'Product image'} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.product?.name || 'Unavailable Product'}</h3>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => {
                                  const newQuantity = Math.max(1, item.quantity - 1);
                                  handleQuantityUpdate(item.product?._id || '', newQuantity);
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input 
                                type="number" 
                                value={item.quantity} 
                                className="w-16 h-8 text-center text-white" 
                                min="1" 
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  handleQuantityUpdate(item.product?._id || '', newQuantity);
                                }}
                              />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityUpdate(item.product?._id || '', item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">
                                ₦{formatPrice(calculateItemPrice(item))}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleDeleteItem(item.product?._id || '')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="mt-6 text-gray-900">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₦{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>₦{formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (7.5%)</span>
                        <span>₦{formatPrice(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₦{formatPrice(total)}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-violet-600" asChild>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <div className="mt-4 text-center">
                      <Link href="/shop" className="text-sm text-gray-600 hover:underline">
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 text-red-500 hover:bg-red-50"
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
