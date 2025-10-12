'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/api/products/requests';
import { FiltersPanel } from '@/components/shop/FiltersPanel';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SearchBar } from '@/components/shop/SearchBar';
import { ViewToggle } from '@/components/shop/ViewToggle';
import { Pagination } from '@/components/shop/Pagination';
import { Product } from '@/types/products';
import { ProductSkeleton } from '@/components/shop/ProductSkeleton';
import { FiltersSkeleton } from '@/components/shop/FiltersSkeleton';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCategory, setInitialCategory] = useState<Product['category'][]>([]);;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
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
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category');
    
    const allowedCategories: Product['category'][] = [
      'cases',
      'screen protectors',
      'magSafe',
      'cables',
      'chargers',
      'powerbanks',
      'headphones',
      'speakers',
      'smartwatches',
      'tablets',
      'laptops',
      'accessories',
    ];

    if (categoryParam && allowedCategories.includes(categoryParam as Product['category'])) {
      setInitialCategory([categoryParam as Product['category']]);
    } else {
      setInitialCategory([]);
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
    const searchResults = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchResults);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <FiltersSkeleton />
            </div>
            <div className="lg:w-3/4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-10 bg-white/10 rounded w-48 animate-pulse" />
                <div className="h-10 bg-white/10 rounded w-32 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} layout="grid" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8">
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
              <ViewToggle layout={layout} onLayoutChange={setLayout} />
            </div>

            <ProductGrid products={paginatedProducts} layout={layout} />

            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}