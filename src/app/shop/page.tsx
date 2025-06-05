'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts } from '@/api/products/requests'
import { FiltersPanel } from '@/components/shop/FiltersPanel'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { SearchBar } from '@/components/shop/SearchBar'
import { ViewToggle } from '@/components/shop/ViewToggle'
import { Pagination } from '@/components/shop/Pagination'
import { Product } from '@/types/products'
import { ProductSkeleton } from '@/components/shop/ProductSkeleton'
import { FiltersSkeleton } from '@/components/shop/FiltersSkeleton'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data)
      setFilteredProducts(data)
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  // Add search params handling
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      handleFilterChange({
        categories: [categoryParam],
        priceRange: [0, 1000000],
        rating: 0,
        inStock: false
      });
    }
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...products]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      )
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    )

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.rating
      )
    }

    // Apply availability filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    const searchResults = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(searchResults)
    setCurrentPage(1)
  }

  // Extract unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category))
  ).sort()

  // Calculate pagination
  const itemsPerPage = 12
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Skeleton */}
            <div className="lg:w-1/4">
              <FiltersSkeleton />
            </div>

            {/* Products Grid Skeleton */}
            <div className="lg:w-3/4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-10 bg-gray-200 rounded w-48 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          <div className="lg:w-1/4">
            <FiltersPanel 
              onFilterChange={handleFilterChange}
              categories={uniqueCategories}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <SearchBar onSearch={handleSearch} />
              <ViewToggle  
                layout={layout} 
                onLayoutChange={setLayout} 
              />
            </div>

            <ProductGrid 
              products={paginatedProducts}
              layout={layout}
            />

            <Pagination 
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}