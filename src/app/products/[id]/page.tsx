'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { getProductById } from '@/api/products/requests'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { ProductDetailsSkeleton } from '@/components/product/ProductDetailsSkeleton'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(resolvedParams.id)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [resolvedParams.id])

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <ProductImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        <RelatedProducts category={product.category} currentProductId={product._id} />
      </div>
    </div>
  )
}
