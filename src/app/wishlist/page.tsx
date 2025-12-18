"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Loader2,
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Plus,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWishlist, removeFromWishlist } from "@/api/wishlist/requests";
import { addToCart } from "@/api/cart/requests";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { showToast } from "@/store/toastStore";
import { WishlistSkeleton } from "@/components/wishlist/WishlistSkeleton";

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
  category?: string;
}

interface WishlistItem {
  product: WishlistProduct;
}

interface WishlistData {
  products: WishlistItem[];
}

export default function WishlistPage() {
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { updateCartCount } = useCart();

  const fetchWishlistData = async () => {
    setIsLoading(true);
    try {
      const data = await getWishlist();
      if (data && data.products) {
        const validProducts = data.products.filter(
          (item: WishlistItem) => item.product
        );
        setWishlistData({ products: validProducts });
      } else {
        setWishlistData({ products: [] });
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistData({ products: [] });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  const handleAddToCart = async (product: WishlistProduct) => {
    if (addingToCart) return;
    setAddingToCart(product._id);

    try {
      await addToCart({ productId: product._id, quantity: 1 });
      await updateCartCount();
      showToast("Item added to cart", "success", 2500);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to add to cart",
        "error",
        3500
      );
    } finally {
      setAddingToCart(null);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (removingId) return;
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
      await fetchWishlistData();
      showToast("Removed from wishlist", "success", 2200);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to remove item",
        "error",
        3500
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!wishlistData?.products.length || removingId) return;

    const confirm = window.confirm(
      "Are you sure you want to clear your entire wishlist?"
    );
    if (!confirm) return;

    try {
      for (const item of wishlistData.products) {
        await removeFromWishlist(item.product._id);
      }
      await fetchWishlistData();
      showToast("Wishlist cleared", "success", 2200);
    } catch (error) {
      showToast("Failed to clear wishlist", "error", 3500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  const itemCount = wishlistData?.products.length || 0;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background gradient - Fixed position */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

      {/* Navigation */}
      <div className=" bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>

            {itemCount > 0 && (
              <Button
                onClick={handleClearAll}
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                disabled={removingId !== null}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium tracking-wide mb-4">
            <Heart className="h-3 w-3 mr-2 fill-emerald-400/20" />
            MY WISHLIST
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Your Saved <span className="text-emerald-400">Favorites</span>
          </h1>

          <p className="text-zinc-400">
            {itemCount > 0
              ? `${itemCount} ${itemCount === 1 ? "item" : "items"} saved`
              : "Start saving items you love"}
          </p>
        </motion.div>

        {/* Wishlist Content */}
        {!itemCount ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="relative inline-block mb-6">
              <Heart className="h-20 w-20 text-emerald-400/20" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-zinc-400 mb-8">
              Save products by clicking the heart icon
            </p>

            <Button
              asChild
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium"
              size="lg"
            >
              <Link href="/shop">
                Explore Products
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Stats Summary */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-between p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-white font-medium">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="hidden sm:block text-sm text-zinc-400">
                  Total Value: ₦
                  {formatPrice(
                    wishlistData!.products.reduce(
                      (sum, item) => sum + item.product.price,
                      0
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {wishlistData!.products.map(({ product }) => (
                  <motion.div
                    key={product._id}
                    layout
                    variants={itemVariants}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{
                      y: -4,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    className="group bg-zinc-900/60 backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${product._id}`}
                      className="block relative"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Quick View Button */}
                        <div className="absolute top-2 right-2">
                          <Button
                            asChild
                            size="icon"
                            className="h-8 w-8 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <Link href={`/products/${product._id}`}>
                              <Eye className="h-4 w-4 text-emerald-400" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      {product.category && (
                        <div className="text-xs text-emerald-400 font-medium mb-1">
                          {product.category}
                        </div>
                      )}

                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 hover:text-emerald-300 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-lg font-bold text-emerald-400">
                            ₦{formatPrice(product.price)}
                          </span>
                          {product.stock < 10 && product.stock > 0 && (
                            <div className="text-xs text-amber-400 mt-1">
                              Only {product.stock} left
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={
                              addingToCart === product._id ||
                              product.stock === 0
                            }
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {addingToCart === product._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {product.stock === 0 ? "Out" : "Add"}
                              </>
                            )}
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handleRemoveFromWishlist(product._id)
                            }
                            disabled={removingId === product._id}
                            className="h-8 w-8 text-zinc-400 hover:text-red-400 cursor-pointer hover:bg-red-400/10"
                            title="Remove from wishlist"
                          >
                            {removingId === product._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom CTA */}
            {itemCount > 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center pt-8 border-t border-zinc-800"
              >
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    asChild
                    className="bg-emerald-500 hover:bg-emerald-400 text-black"
                    size="sm"
                  >
                    <Link href="/cart">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Cart
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                    size="sm"
                  >
                    <Link href="/shop">
                      Continue Shopping
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
