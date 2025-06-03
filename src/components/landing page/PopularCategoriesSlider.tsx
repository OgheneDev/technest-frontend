"use client"

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
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

const PopularCategoriesSlider = forwardRef((_, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(2);
    const { ref: scrollRef, isVisible } = useScrollAnimation();
    const touchStartRef = useRef(0);
    const touchEndRef = useRef(0);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            const width = window.innerWidth;
            if (width >= 1280) setItemsPerSlide(5);
            else if (width >= 1024) setItemsPerSlide(4);
            else if (width >= 768) setItemsPerSlide(3);
            else setItemsPerSlide(2);
        };

        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    const nextSlide = () => {
        setCurrentSlide(prev => 
            prev < popularCategories.length - itemsPerSlide ? prev + 1 : prev
        );
    };

    const prevSlide = () => {
        setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        const clientX = e.type === 'touchstart' ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
        touchStartRef.current = clientX;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        const clientX = e.type === 'touchmove' ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
        touchEndRef.current = clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartRef.current - touchEndRef.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    // Add these new event handlers
    const handleInteractionStart = (e: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        touchStartRef.current = clientX;
    };

    const handleInteractionMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (touchStartRef.current === 0) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        touchEndRef.current = clientX;
    };

    const handleInteractionEnd = () => {
        if (touchStartRef.current === 0) return;
        const diff = touchStartRef.current - touchEndRef.current;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentSlide < maxSlideIndex) {
                nextSlide();
            } else if (diff < 0 && currentSlide > 0) {
                prevSlide();
            }
        }
        
        // Reset touch positions
        touchStartRef.current = 0;
        touchEndRef.current = 0;
    };

    const popularCategories = [
        { id: 1, name: 'Cases', stock: 11, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-1_mh7sca.jpg' },
        { id: 2, name: 'Screen Protectors', stock: 4, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-2_bbyzwf.jpg' },
        { id: 3, name: 'MagSafe', stock: 2, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-3_r12qoc.jpg' },
        { id: 4, name: 'Cables', stock: 10, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-4_iav9sb.jpg' },
        { id: 5, name: 'Chargers', stock: 7, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-5_uqrrzi.jpg' },
        { id: 6, name: 'Power Banks', stock: 14, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-6_ruo9b8.jpg' },
        { id: 7, name: 'Headphones', stock: 3, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-7_yvcx6k.jpg' },
    ];

    const maxSlideIndex = Math.max(popularCategories.length - itemsPerSlide, 0);

    // Combine refs
    const combinedRef = (node: HTMLDivElement) => {
        scrollRef.current = node as unknown as null;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

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

    return (
        <motion.div
            ref={combinedRef}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative max-w-full mx-auto py-8 md:py-[50px] px-[30px] md:px-[50px] bg-white"
        >
            <motion.h2 
                variants={itemVariants}
                className="text-lg md:text-3xl md:font-bold font-semibold mb-4 pl-4 text-gray-900"
            >
                Popular Categories
            </motion.h2>
            
            <div 
                className="slider-wrapper overflow-hidden relative"
                onTouchStart={handleInteractionStart}
                onTouchMove={handleInteractionMove}
                onTouchEnd={handleInteractionEnd}
                onMouseDown={handleInteractionStart}
                onMouseMove={handleInteractionMove}
                onMouseUp={handleInteractionEnd}
                onMouseLeave={handleInteractionEnd}
            >
                <motion.div
                    className="slider-inner flex gap-4 md:gap-1 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}
                >
                    {popularCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            className="flex flex-col items-center cursor-pointer p-4 flex-shrink-0 text-center hover:scale-95 transition-all"
                            style={{ width: `${100 / itemsPerSlide}%` }}
                        >
                            <motion.img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-auto rounded-lg mb-3 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <motion.h3 variants={itemVariants} className="text-md font-medium text-gray-900">
                                {category.name}
                            </motion.h3>
                            <motion.p variants={itemVariants} className="text-sm text-gray-500">
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
                    className="absolute left-2 cursor-pointer md:left-[90px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                    <ArrowLeft size={15} className="text-gray-700" />
                </motion.button>
            )}
            {currentSlide < maxSlideIndex && (
                <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute cursor-pointer right-2 md:right-[70px] top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                    <ArrowRight size={15} className="text-gray-700" />
                </motion.button>
            )}
        </motion.div>
    );
});

PopularCategoriesSlider.displayName = 'PopularCategoriesSlider';

export default PopularCategoriesSlider;