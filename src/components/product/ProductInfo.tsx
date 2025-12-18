"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/products";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Loader2,
  Package,
  RefreshCw,
  Truck,
  Shield,
  CheckCircle,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { addToCart } from "@/api/cart/requests";
import { addToWishlist, removeFromWishlist } from "@/api/wishlist/requests";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/useAuthStore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getWishlist } from "@/api/wishlist/requests";
import { showToast } from "@/store/toastStore";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { updateCartCount } = useCart();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated) return;
      try {
        const wishlistData = await getWishlist();
        setIsInWishlist(
          wishlistData.products.some(
            (item: any) => item.product._id === product._id
          )
        );
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };
    checkWishlistStatus();
  }, [product._id, isAuthenticated]);

  const handleAuthRequired = async (action: "cart" | "wishlist") => {
    if (!isAuthenticated) {
      const result = await Swal.fire({
        title: "Authentication Required",
        text: `Please login to add items to your ${action}`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#10b981",
        background: "#0a0a0a",
        color: "#fff",
      });
      if (result.isConfirmed) {
        router.push("/login");
      }
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!(await handleAuthRequired("cart"))) return;

    setIsAddingToCart(true);
    try {
      await addToCart({ productId: product._id, quantity });
      await updateCartCount();
      showToast("Added to cart", "success", 2500);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to add to cart",
        "error",
        3500
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!(await handleAuthRequired("wishlist"))) return;
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
      console.error("Wishlist error:", error);
      showToast(
        error instanceof Error ? error.message : "Wishlist error",
        "error",
        3500
      );
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-zinc-600 fill-zinc-600"
          }`}
        />
      ))}
    </div>
  );

  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs"
          >
            {product.category}
          </Badge>
          {isLowStock && (
            <Badge
              variant="outline"
              className="text-amber-400 border-amber-500/30 bg-amber-500/10 text-xs"
            >
              Low Stock
            </Badge>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Rating & Stock Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-zinc-600 fill-zinc-600"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-zinc-400">
            <span className="font-medium text-white">
              {product.rating.toFixed(1)}
            </span>{" "}
            rating
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            product.stock > 0
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              product.stock > 0 ? "bg-emerald-400" : "bg-red-400"
            }`}
          />
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </div>
      </div>

      {/* Price */}
      <div className="pt-4">
        <div className="text-3xl md:text-4xl font-bold text-emerald-400">
          ₦{formatPrice(product.price)}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3 pt-4">
        <label className="text-sm font-medium text-zinc-300">Quantity</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="cursor-pointer bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="relative w-20">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(
                    1,
                    Math.min(parseInt(e.target.value) || 1, product.stock)
                  )
                )
              }
              className="w-full text-center bg-zinc-800 text-white border border-zinc-700 rounded-lg py-2.5 px-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= product.stock}
            className="cursor-pointer bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </Button>
          {product.stock > 0 && (
            <div className="ml-auto text-xs text-zinc-500">
              Max: {product.stock}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <Button
          size="lg"
          className="flex-1 cursor-pointer py-3 text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock < 1}
        >
          {isAddingToCart ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <ShoppingCart className="h-5 w-5 mr-2" />
          )}
          {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleWishlistToggle}
          disabled={isUpdatingWishlist}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-600"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-zinc-400"
            }`}
          />
        </Button>
      </div>

      {/* Trust & Benefits */}
      <div className="pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
            <Package className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
            <RefreshCw className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate">30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
            <Shield className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate">2-Year Warranty</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="pt-6 border-t border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-6 border-t border-zinc-800 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          Additional Information
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>Authentic product with manufacturer warranty</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Truck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>Same-day dispatch for orders before 2pm</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>24/7 customer support available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
