"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProducts } from '@/api/products/requests'
import { Product } from '@/types/products'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FeaturedProductCard from './FeaturedProductCard'
import FeaturedProductCardSkeleton from './FeaturedProductCardSkeleton'
import { Button } from '../ui/button'

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
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
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { 
            opacity: 0, 
            y: -20 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hidden: { 
            opacity: 0, 
            x: 20 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const errorVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8 
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

   return (
    <motion.div 
        className="relative py-8 md:py-[50px] px-[30px] md:px-[50px] bg-gradient-to-b from-gray-900 to-black overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.1 }}
    >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Floating orbs */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

        <div className='relative z-10 flex items-center justify-between mb-8'>
            <motion.h2 
                className='text-xl md:text-3xl font-bold mb-4 pl-4 text-white'
                variants={headerVariants}
            >
                Featured Products
            </motion.h2>
            
            <motion.div variants={buttonVariants}>
                <Link href='/shop' className='hidden md:block'>
                    <Button
                        size='lg'
                        className='bg-white/10 backdrop-blur-sm text-sm border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 text-white group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105'
                    >
                        View All
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </Link>
            </motion.div>
        </div>

        <motion.div 
            className='relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto'
            variants={containerVariants}
        >
            {loading ? (
                <>
                    {[...Array(4)].map((_, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            custom={index}
                        >
                            <FeaturedProductCardSkeleton />
                        </motion.div>
                    ))}
                </>
            ) : error ? (
                <motion.div 
                    className='col-span-full flex items-center justify-center py-12'
                    variants={errorVariants}
                >
                    <div className='text-center'>
                        <div className='text-red-400 text-lg font-medium mb-2'>
                            {error}
                        </div>
                        <p className='text-white/60 text-sm'>
                            Please try refreshing the page
                        </p>
                    </div>
                </motion.div>
            ) : recentProducts.length > 0 ? (
                recentProducts.map((product, index) => (
                    <motion.div
                        key={product._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        whileHover={{ y: -5 }}
                    >
                        <FeaturedProductCard product={product} />
                    </motion.div>
                ))
            ) : (
                <motion.div 
                    className='col-span-full flex items-center justify-center py-12'
                    variants={errorVariants}
                >
                    <div className='text-center'>
                        <div className='text-white text-lg font-medium mb-2'>
                            No Featured Products Available
                        </div>
                        <p className='text-white/60 text-sm'>
                            Check back later for new products
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>

        <style jsx>{`
            .bg-grid-white\\/\\[0\\.02\\] {
                background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
            }
        `}</style>
    </motion.div>
   )
}

export default FeaturedProductsSection