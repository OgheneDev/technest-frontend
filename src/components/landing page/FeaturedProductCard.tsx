import React, { useState, useEffect } from "react";
import { Product } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { ShoppingCart, Loader2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { getCart, addToCart } from "@/api/cart/requests";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/api/wishlist/requests";
import { AddToCartParams } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToastStore } from "@/store/useToastStore";

interface FeaturedProductCardProps {
  product: Product;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  product,
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { updateCartCount } = useCart();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { showToast } = useToastStore();

  const handleAuthRequired = (action: "cart" | "wishlist") => {
    if (!isAuthenticated) {
      showToast(`Please login to add items to your ${action}`, "error", 4000);
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!handleAuthRequired("cart")) return;
    if (isAddingToCart) return;

    if (product.stock < 1) {
      showToast("This item is currently unavailable", "error", 3000);
      return;
    }

    setIsAddingToCart(true);
    try {
      const currentCart = await getCart();
      const existingItem = currentCart.products.find(
        (item: { product: string | { _id: string }; quantity: number }) => {
          const productId =
            typeof item.product === "string" ? item.product : item.product?._id;
          return productId === product._id;
        }
      );

      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      if (newQuantity > product.stock) {
        showToast(
          "Cannot add more of this item - stock limit reached",
          "error",
          3000
        );
        return;
      }

      const cartData: AddToCartParams = {
        productId: product._id,
        quantity: newQuantity,
      };

      await addToCart(cartData);
      await updateCartCount();
      showToast(
        existingItem ? "Cart quantity updated" : "Item added to cart",
        "success",
        2500
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item to cart";
      showToast(errorMessage, "error", 3500);
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
        console.error("Error checking wishlist status:", error);
        showToast("Failed to load wishlist status", "error", 3000);
      }
    };

    checkWishlistStatus();
  }, [product._id, isAuthenticated]);

  const handleWishlistClick = async () => {
    if (!handleAuthRequired("wishlist")) return;
    if (isUpdatingWishlist) return;

    setIsUpdatingWishlist(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        setIsInWishlist(false);
        showToast("Removed from wishlist", "success", 2500);
      } else {
        await addToWishlist(product._id);
        setIsInWishlist(true);
        showToast("Added to wishlist", "success", 2500);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update wishlist";
      showToast(errorMessage, "error", 3500);
      setIsInWishlist((prev) => !prev);
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
      <Card className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300">
        <Link href={`/products/${product._id}`}>
          <motion.div
            className="relative aspect-square cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {product.stock < 5 && product.stock > 0 && (
              <Badge className="absolute right-2 top-2 bg-amber-500 text-black font-semibold border-0">
                Only {product.stock} left
              </Badge>
            )}

            {product.stock === 0 && (
              <Badge className="absolute right-2 top-2 bg-red-500 text-white font-semibold border-0">
                Out of Stock
              </Badge>
            )}
          </motion.div>
        </Link>

        <CardContent className="p-4 bg-transparent">
          <div className="space-y-3 pt-4">
            <Link href={`/products/${product._id}`}>
              <h3 className="font-semibold mb-2 text-white line-clamp-1 hover:text-emerald-400 transition-colors">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-emerald-400">
                ₦{formatPrice(product.price)}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="rounded-lg p-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock < 1}
                >
                  {isAddingToCart ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 text-zinc-400" />
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  className="rounded-lg p-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
                  onClick={handleWishlistClick}
                  disabled={isUpdatingWishlist}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist
                        ? "fill-emerald-500 text-emerald-500"
                        : "text-zinc-400"
                    } transition-colors`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedProductCard;
