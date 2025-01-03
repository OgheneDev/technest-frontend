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
      key={`${selectedCategory}-${loading}`} // Re-render container when category changes
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
      className="relative max-w-full mx-auto py-8 md:px-[120px] px-[20px]"
    >
      {/* Header and category buttons */}
      <div className="flex flex-col md:flex-row justify-center items-start md:justify-between mb-6">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg md:text-3xl font-semibold mb-4 text-center mx-auto md:mx-0"
        >
          Featured Products
        </motion.h2>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="toggle-buttons flex gap-[15px] justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`uppercase text-dark border rounded-full py-[5px] px-[20px] font-bold text-[13px] ${
                selectedCategory === category ? "bg-[#6610f2] text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Previous button */}
        {activeIndex > 0 && (
          <motion.button
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNavigate("prev")}
            className="z-[1000] absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            style={{ zIndex: 1000 }}
          >
            <ArrowLeft size={15} />
          </motion.button>
        )}

        {/* Product slider */}
        <div
          className="product-slider testimonial-slider flex overflow-x-auto snap-x snap-mandatory gap-[20px] px-4"
          ref={sliderRef}
        >
          {loading ? (
            // Skeleton loader
            Array.from({ length: skeletonCount }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="product-skeleton animate-pulse w-[90%] md:w-[24%] p-[10px] md:p-[20px] h-[200px] md:h-[380px] mx-auto rounded-[15px]"
              >
                <div className="skeleton-image w-[100%] bg-gray-300 h-[100px] md:h-[200px] mb-[10px] md:mb-[20px] rounded-[15px]"></div>
                <div className="skeleton-category w-[50%] md:w-[30%] mx-auto bg-gray-300 h-[10px] mb-[5px] rounded-[5px]"></div>
                <div className="skeleton-title w-[80%] md:w-[70%] mx-auto bg-gray-300 h-[15px] md:h-[20px] mb-[8px] md:mb-[10px] rounded-[5px]"></div>
                <div className="skeleton-rating w-[60%] md:w-[40%] mx-auto bg-gray-300 h-[10px] md:h-[20px] mb-[10px] md:mb-[15px] rounded-[5px]"></div>
                <div className="skeleton-price w-[50%] md:w-[45%] mx-auto bg-gray-300 h-[15px] md:h-[20px] rounded-[5px]"></div>
              </motion.div>
            ))
          ) : error ? (
            <div className="w-full text-center py-8 text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="w-full text-center py-8">
              <p>No products found in {selectedCategory} category.</p>
            </div>
          ) : (
            // Actual product display
            products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="snap-center text-center cursor-pointer flex flex-col gap-[10px] relative shrink-0 w-[43vw] md:w-[24%] p-[20px] bg-[#F4F4F4] rounded-[15px]"
              >
                <Link to={`/product/${product.id}`}>
                  <motion.img
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full rounded"
                  />
                </Link>
                <motion.span
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="uppercase text-gray-600 text-[11px] font-bold"
                >
                  {product.category}
                </motion.span>
                <motion.h4 
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-bold text-dark truncate w-full"
                >
                  {product.name}
                </motion.h4>
                <motion.div 
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-1 mb-2 justify-center"
                >
                  {renderStars(product.rating)}
                </motion.div>
                <motion.p
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-bold text-dark"
                >
                  ${product.price.toFixed(2)}
                </motion.p>
                <motion.span
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-red-600 text-white uppercase text-[11px] py-[2px] px-[10px] absolute rounded-full"
                >
                  Hot
                </motion.span>
                <motion.button
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white rounded-full p-[6px] border border-gray-400 w-fit absolute right-2"
                >
                  <Link to={`/product/${product.id}`}>
                    <ArrowRight size={15} />
                  </Link>
                </motion.button>
              </motion.div>
            ))
          )}
        </div>

        {/* Next button */}
        {activeIndex < products.length - 1 && (
          <motion.button
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNavigate("next")}
            className="z-[100] absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            style={{ zIndex: 100 }}
          >
            <ArrowRight size={15} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;