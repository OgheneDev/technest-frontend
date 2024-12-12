import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePopularCategories } from '../../context/PopularContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Custom hook for scroll-based animation (reused from Services Section)
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
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

// Use forwardRef to properly handle ref passing
const PopularCategoriesSlider = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        currentSlide,
        itemsPerSlide,
        popularCategories,
        nextSlide,
        prevSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = usePopularCategories();

    // Use scroll animation hook
    const { ref: scrollRef, isVisible } = useScrollAnimation();

    // Handle category click
    const handleCategoryClick = (categoryName) => {
        // Convert category name to URL-friendly format
        const urlFriendlyCategoryName = categoryName
            .toLowerCase()
            .replace(/\s+/g, '-');
        
        // Navigate to category page
        navigate(`/category/${urlFriendlyCategoryName}`);
    };

    // Combine refs if needed
    const combinedRef = (node) => {
        // Assign to scrollRef
        if (scrollRef) {
            scrollRef.current = node;
        }
        
        // Handle forwarded ref
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    // Variants for container and item animations
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Calculate the maximum slide index, where only a full row of items is displayed
    const maxSlideIndex = Math.max(popularCategories.length - itemsPerSlide, 0);

    return (
        <motion.div
            ref={combinedRef}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative max-w-full mx-auto py-8 md:py-[50px] px-[30px] md:px-[100px]"
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            { 
             ['/', '/about-us'].includes(location.pathname) && (
             <motion.h2 
              variants={itemVariants}
              className="text-lg md:text-3xl md:font-bold font-semibold mb-4 pl-4"
             >
               Popular Categories
             </motion.h2>
             )   
            }
            
            <div className="slider-wrapper overflow-hidden relative">
                <motion.div
                    className="slider-inner flex gap-1 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}
                >
                    {popularCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            onClick={() => handleCategoryClick(category.name)}
                            className="flex flex-col items-center bg-white cursor-pointer p-4 flex-shrink-0 text-center"
                            style={{ width: `${100 / itemsPerSlide}%` }}
                        >
                            <motion.img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-auto rounded-md mb-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <motion.h3 
                                variants={itemVariants}
                                className="text-md font-medium"
                            >
                                {category.name}
                            </motion.h3>
                            <motion.p 
                                variants={itemVariants}
                                className="text-sm text-gray-600"
                            >
                                {category.stock} products
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation buttons */}
            {currentSlide > 0 && (
                <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-2 md:left-[90px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
                >
                    <ArrowLeft size={15} />
                </motion.button>
            )}
            {currentSlide < maxSlideIndex && (
                <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 md:right-[70px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
                >
                    <ArrowRight size={15} />
                </motion.button>
            )}
        </motion.div>
    );
});

PopularCategoriesSlider.displayName = 'PopularCategoriesSlider';

export default PopularCategoriesSlider;