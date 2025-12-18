"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/api/products/requests";
import { Product } from "@/types/products";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FeaturedProductCard from "./FeaturedProductCard";
import FeaturedProductCardSkeleton from "./FeaturedProductCardSkeleton";
import { Button } from "../ui/button";

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();

        if (!productsData) {
          throw new Error("No products data received");
        }

        const validProducts = Array.isArray(productsData) ? productsData : [];
        setProducts(validProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProducts([]);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const recentProducts = products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="relative py-16 bg-zinc-950 overflow-hidden">
      {/* Add the same gradient overlay as Hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Featured <span className="text-emerald-400">Products</span>
              </h2>
              <p className="text-zinc-400">
                Discover our handpicked collection
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden md:block">
              <Link href="/shop">
                <button className="bg-emerald-500 hover:bg-emerald-400 px-5 py-2 flex gap-2 items-center text-sm cursor-pointer rounded-md text-black transition-all group">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {loading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <FeaturedProductCardSkeleton />
                  </motion.div>
                ))}
              </>
            ) : error ? (
              <motion.div
                className="col-span-full flex items-center justify-center py-12"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-red-400 text-lg font-medium mb-2">
                    {error}
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Please try refreshing the page
                  </p>
                </div>
              </motion.div>
            ) : recentProducts.length > 0 ? (
              recentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <FeaturedProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full flex items-center justify-center py-12"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-white text-lg font-medium mb-2">
                    No Featured Products Available
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Check back later for new products
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile View All Button */}
          <motion.div
            variants={itemVariants}
            className="md:hidden mt-8 flex justify-center"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all group w-full"
              >
                View All Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
