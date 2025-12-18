"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import {
  getProductById,
  getProductReviews,
  postProductReview,
} from "@/api/products/requests";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductDetailsSkeleton } from "@/components/product/ProductDetailsSkeleton";
import ProductReviews from "@/components/product/ProductReviews";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(resolvedParams.id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-12">
          <ProductReviews productId={product._id} />
        </div>
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </div>
    </div>
  );
}
