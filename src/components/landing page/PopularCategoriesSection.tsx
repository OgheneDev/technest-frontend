"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/api/products/requests';

// Custom hook for scroll-based animation
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

const PopularCategories = () => {
  const { ref, isVisible } = useScrollAnimation();
  const router = useRouter();
  type Category = {
    id: number;
    name: string;
    value: string;
    image: string;
    stock: number;
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Static category definitions with images
  const staticCategories = [
    { id: 1, name: 'Cases', value: 'cases', image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-1_mh7sca.jpg' },
    { id: 2, name: 'Protectors', value: 'screen-protectors', image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-2_bbyzwf.jpg' },
    { id: 3, name: 'Chargers', value: 'chargers', image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-5_uqrrzi.jpg' },
    { id: 4, name: 'Power Banks', value: 'powerbanks', image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-6_ruo9b8.jpg' },
    { id: 5, name: 'Headphones', value: 'headphones', image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-7_yvcx6k.jpg' },
  ];

  // Fetch products and count by category
  // Define a Product type based on your API response structure
  type Product = {
    category: string;
    // add other fields if needed
  };

  useEffect(() => {
    const fetchProductCounts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        // Group products by category and count
        const categoryCounts = products.reduce((acc: Record<string, number>, product: Product) => {
          const category = product.category; // Adjust based on your API response structure
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Map static categories with fetched counts
        const updatedCategories = staticCategories.map((category) => ({
          ...category,
          stock: categoryCounts[category.value] || 0, // Use category.value to match API category
        }));

        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error processing products:', error);
        // Fallback to static categories with 0 counts
        setCategories(staticCategories.map((cat) => ({ ...cat, stock: 0 })));
      } finally {
        setLoading(false);
      }
    };

    fetchProductCounts();
  }, []);

  const handlePopularCategoryClick = (categoryName: string) => {
    router.push(`/shop?category=${categoryName}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="relative max-w-full mx-auto py-8 md:py-[50px] px-5 md:px-[50px] bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

      <motion.h2
        variants={itemVariants}
        className="relative z-10 text-xl text-center md:text-start font-bold md:text-3xl md:font-bold mb-4 pl-4 text-white"
      >
        Popular Categories
      </motion.h2>

      <div className="relative z-10 flex flex-wrap gap-4 justify-center">
        {loading
          ? // Render custom skeletons during loading
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] p-4"
                >
                  <div className="relative w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                    <div className="skeleton skeleton-image rounded-lg mb-3"></div>
                    <div className="skeleton skeleton-text w-24 h-5 mx-auto mb-2"></div>
                    <div className="skeleton skeleton-text w-16 h-4 mx-auto"></div>
                  </div>
                </div>
              ))
          : // Render categories when loaded
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group flex flex-col items-center cursor-pointer p-4 text-center hover:scale-105 transition-all duration-300 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)]"
                whileHover={{ y: -5 }}
                onClick={() => handlePopularCategoryClick(category.value)}
              >
                {/* Card with glassmorphism effect */}
                <div className="relative w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                  <motion.div className="relative">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-auto rounded-lg mb-3 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                    <motion.h3
                      variants={itemVariants}
                      className="text-md font-medium text-white group-hover:text-cyan-300 transition-colors duration-300"
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p
                      variants={itemVariants}
                      className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300"
                    >
                      {category.stock} products
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }

        .skeleton {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }

        .skeleton-image {
          width: 100%;
          height: 150px;
        }

        .skeleton-text {
          border-radius: 4px;
        }

        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PopularCategories;