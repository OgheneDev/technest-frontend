"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/api/products/requests";
import { FiltersPanel } from "@/components/shop/FiltersPanel";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SearchBar } from "@/components/shop/SearchBar";
import { ViewToggle } from "@/components/shop/ViewToggle";
import { Pagination } from "@/components/shop/Pagination";
import { Product } from "@/types/products";
import { ProductSkeleton } from "@/components/shop/ProductSkeleton";
import { FiltersSkeleton } from "@/components/shop/FiltersSkeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCategory, setInitialCategory] = useState<Product["category"][]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  ).sort();

  // Handle URL category parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const categoryParam = searchParams.get("category");

      const allowedCategories: Product["category"][] = [
        "cases",
        "screen protectors",
        "magSafe",
        "cables",
        "chargers",
        "powerbanks",
        "headphones",
        "speakers",
        "smartwatches",
        "tablets",
        "laptops",
        "accessories",
      ];

      if (
        categoryParam &&
        allowedCategories.includes(categoryParam as Product["category"])
      ) {
        setInitialCategory([categoryParam as Product["category"]]);
      } else {
        setInitialCategory([]);
      }
    }
  }, [products]);

  const handleFilterChange = (filters: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
  }) => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Apply availability filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const searchResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(searchResults);
    }
    setCurrentPage(1);
    // Clear category filters when searching
    setInitialCategory([]);
  };

  // Calculate pagination
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <FiltersSkeleton />
            </div>
            <div className="lg:w-3/4 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="h-10 bg-zinc-800 rounded w-full sm:w-96 animate-pulse" />
                <div className="h-10 bg-zinc-800 rounded w-20 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} layout="grid" />
                ))}
              </div>
              <div className="h-10 bg-zinc-800 rounded w-64 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative">
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium tracking-wide mb-4"
          >
            SHOP COLLECTION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Discover Our <span className="text-emerald-400">Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Explore our curated collection of premium products
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FiltersPanel
              onFilterChange={handleFilterChange}
              categories={uniqueCategories}
              initialCategories={initialCategory}
            />
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <SearchBar onSearch={handleSearch} />
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-zinc-400 hidden sm:block"
                >
                  {filteredProducts.length} products found
                  {searchQuery && ` for "${searchQuery}"`}
                </motion.div>
                <ViewToggle layout={layout} onLayoutChange={setLayout} />
              </div>
            </div>

            <ProductGrid products={paginatedProducts} layout={layout} />

            {filteredProducts.length > 0 && (
              <Pagination
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  No products found
                </h3>
                <p className="text-zinc-400">
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : "Try adjusting your filters"}
                </p>
                {searchQuery && (
                  <Button
                    onClick={() => handleSearch("")}
                    className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-black"
                  >
                    Clear Search
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
