'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/api/products/requests'
import { Product } from '@/types/products'
import { ShopProductCard } from '../shop/ShopProductCard'
import { motion } from 'framer-motion'

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export const RelatedProducts = ({ category, currentProductId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const products = await getProducts()
        const filtered: Product[] = products
          .filter((product: Product) => 
            product.category === category && 
            product._id !== currentProductId
          )
          .slice(0, 4)
        setRelatedProducts(filtered)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [category, currentProductId])

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ShopProductCard
            key={product._id}
            product={product}
            layout="grid"
          />
        ))}
      </div>
    </div>
  )
}
