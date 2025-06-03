"use client"

import React, { useState, useEffect } from 'react'
import { getProducts } from '@/api/products/requests'
import { Product } from '@/types/products'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FeaturedProductCard from './FeaturedProductCard'
import FeaturedProductCardSkeleton from './FeaturedProductCardSkeleton'

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
                throw new Error('No products data received');
            }

            //Ensure products are in an array
            const validProducts = Array.isArray(productsData) ? productsData : [];
            setProducts(validProducts);
            setError(null);
        } catch (error) {
            console.error("Error fetching featured products:", error);
            setProducts([]);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
       }

       fetchFeaturedProducts();
    }, []);

    const recentProducts = products.slice(0,4);

  return (
    <div className="py-8 md:py-[50px] px-[30px] md:px-[50px] bg-white">
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-lg md:text-3xl md:font-bold font-semibold mb-4 pl-4 text-gray-900'>Featured Products</h2>
          <button className='text-blue-500'>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto'>
          {loading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <FeaturedProductCardSkeleton key={index} />
              ))}
            </>
          ) : error ? (
            <div className='text-red-500'>{error}</div>
          ) : recentProducts.length > 0 ? recentProducts.map((product) => (
              <FeaturedProductCard key={product._id} product={product}  />
          )) : (
            <div className='text-black'>No Featured Products Available</div>
          )}
        </div>
    </div>
  )
}

export default FeaturedProductsSection