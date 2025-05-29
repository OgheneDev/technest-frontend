import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "../../context/FeaturedProductsContext";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const FeaturedProducts = () => {
  const [skeletonCount, setSkeletonCount] = useState(4); 

  const {
    products = [],
    activeIndex = 0,
    sliderRef,
    selectedCategory,
    setSelectedCategory,
    handleNavigate,
    loading,
    error,
  } = useFeaturedProducts();

  // Animation variants
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

  // Render star ratings
  const renderStars = (rating = 4) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? "fill-[#444] text-[#444]" : "text-gray-300"}
      />
    ));
  };

  const categories = ["cases", "chargers", "cables"];

  // Dynamically adjust the skeleton count based on screen size
  useEffect(() => {
    const updateSkeletonCount = () => {
      if (window.innerWidth <= 768) {
        setSkeletonCount(2); // Show 2 skeletons on mobile
      } else if (window.innerWidth <= 1024) {
        setSkeletonCount(3); // Show 3 skeletons on tablets
      } else {
        setSkeletonCount(4); // Default to 4 on larger screens
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  return (
    <motion.div
      key={`${selectedCategory}-${loading}`}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
      className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      {/* Header and category buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <motion.div variants={itemVariants} className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our most popular items</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category 
                  ? 'bg-gray-900 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }
              `}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {activeIndex > 0 && (
          <motion.button
            variants={itemVariants}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-900 hover:text-white transition-all duration-200 z-10"
            onClick={() => handleNavigate("prev")}
          >
            <ArrowLeft size={20} />
          </motion.button>
        )}

        {/* Product Cards Container */}
        <div ref={sliderRef} className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500 ease-out">
            {loading ? (
              // Skeleton loader
              Array.from({ length: skeletonCount }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="w-full md:w-[calc(25%-1.5rem)] shrink-0"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="aspect-square rounded-xl bg-gray-200 animate-pulse mb-4" />
                    <div className="space-y-3">
                      <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : error ? (
              <div className="w-full text-center py-8 text-red-500">{error}</div>
            ) : products.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                No products found in {selectedCategory} category.
              </div>
            ) : (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="w-full md:w-[calc(25%-1.5rem)] shrink-0"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                      {product.isHot && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Hot
                        </span>
                      )}
                      <div className="aspect-square rounded-xl bg-gray-50 p-4 mb-4 group-hover:bg-gray-100 transition-colors">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 uppercase">
                          {product.category}
                        </p>
                        <h3 className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <div className="flex gap-1">
                          {renderStars(product.rating)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                          <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                            <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {activeIndex < products.length - 1 && (
          <motion.button
            variants={itemVariants}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-900 hover:text-white transition-all duration-200 z-10"
            onClick={() => handleNavigate("next")}
          >
            <ArrowRight size={20} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;