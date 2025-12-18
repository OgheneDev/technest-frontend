"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getProducts } from "@/api/products/requests";

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
    {
      id: 1,
      name: "Cases",
      value: "cases",
      image:
        "https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-1_mh7sca.jpg",
    },
    {
      id: 2,
      name: "Protectors",
      value: "screen-protectors",
      image:
        "https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-2_bbyzwf.jpg",
    },
    {
      id: 3,
      name: "Chargers",
      value: "chargers",
      image:
        "https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-5_uqrrzi.jpg",
    },
    {
      id: 4,
      name: "Power Banks",
      value: "powerbanks",
      image:
        "https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-6_ruo9b8.jpg",
    },
    {
      id: 5,
      name: "Headphones",
      value: "headphones",
      image:
        "https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-7_yvcx6k.jpg",
    },
  ];

  // Fetch products and count by category
  type Product = {
    category: string;
  };

  useEffect(() => {
    const fetchProductCounts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        // Group products by category and count
        const categoryCounts = products.reduce(
          (acc: Record<string, number>, product: Product) => {
            const category = product.category;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          },
          {}
        );

        // Map static categories with fetched counts
        const updatedCategories = staticCategories.map((category) => ({
          ...category,
          stock: categoryCounts[category.value] || 0,
        }));

        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error processing products:", error);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950"
    >
      <motion.div variants={itemVariants} className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Popular <span className="text-emerald-400">Categories</span>
        </h2>
        <p className="text-zinc-400">Explore our top product collections</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading
          ? // Render skeletons during loading
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-square rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <div className="skeleton w-full h-full"></div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="skeleton h-5 w-20 rounded"></div>
                    <div className="skeleton h-4 w-16 rounded"></div>
                  </div>
                </div>
              ))
          : // Render categories when loaded
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ y: -4 }}
                onClick={() => handlePopularCategoryClick(category.value)}
              >
                <div className="relative aspect-square rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden group-hover:border-emerald-500/50 transition-all duration-300">
                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category info */}
                <div className="mt-3">
                  <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {category.stock} products
                  </p>
                </div>
              </motion.div>
            ))}
      </div>

      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(39, 39, 42, 1) 25%,
            rgba(63, 63, 70, 1) 50%,
            rgba(39, 39, 42, 1) 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
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
