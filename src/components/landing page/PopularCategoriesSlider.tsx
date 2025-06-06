"use client"

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Custom hook for scroll-based animation (reused from Services Section)
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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

    const popularCategories = [
        { id: 1, name: 'Cases', stock: 11, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-1_mh7sca.jpg' },
        { id: 2, name: 'Screen Protectors', stock: 4, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-2_bbyzwf.jpg' },
        { id: 3, name: 'MagSafe', stock: 2, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-3_r12qoc.jpg' },
        { id: 4, name: 'Cables', stock: 10, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-4_iav9sb.jpg' },
        { id: 5, name: 'Chargers', stock: 7, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-5_uqrrzi.jpg' },
        { id: 6, name: 'Power Banks', stock: 14, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-6_ruo9b8.jpg' },
        { id: 7, name: 'Headphones', stock: 3, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-7_yvcx6k.jpg' },
    ];

    // Fixed calculation: Total slides needed = total items - items per slide + 1
    const maxSlideIndex = Math.max(popularCategories.length - itemsPerSlide, 0);
    const totalSlides = maxSlideIndex + 1;

    const nextSlide = () => {
        setCurrentSlide(prev => 
            prev < maxSlideIndex ? prev + 1 : prev
        );
    };

    const prevSlide = () => {
        setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
    };

    const handleInteractionStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clientX = 'touches' in e ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
        touchStartRef.current = clientX;
    };

    const handleInteractionMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (touchStartRef.current === 0) return;
        const clientX = 'touches' in e ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX;
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

    // Combine refs
    const combinedRef = (node: HTMLDivElement | null) => {
        scrollRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
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
            className="relative max-w-full mx-auto py-8 md:py-[50px] px-[30px] md:px-[50px] bg-gradient-to-b from-gray-900 to-black"
        >
            {/* Subtle background effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            
            <motion.h2 
                variants={itemVariants}
                className="relative z-10 text-lg md:text-3xl md:font-bold font-semibold mb-4 pl-4 text-white"
            >
                Popular Categories
            </motion.h2>
            
            <div 
                className="relative z-10 slider-wrapper overflow-hidden"
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
                    style={{ 
                        transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
                        width: `${(popularCategories.length / itemsPerSlide) * 100}%`
                    }}
                >
                    {popularCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            className="group flex flex-col items-center cursor-pointer p-4 flex-shrink-0 text-center hover:scale-105 transition-all duration-300"
                            style={{ width: `${100 / popularCategories.length}%` }}
                            whileHover={{ y: -5 }}
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
                                        transition={{ type: "spring", stiffness: 300 }}
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
                </motion.div>
            </div>

            {/* Navigation buttons */}
            {currentSlide > 0 && (
                <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-2 cursor-pointer md:left-[90px] top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
                >
                    <ArrowLeft size={18} className="text-white" />
                </motion.button>
            )}
            {currentSlide < maxSlideIndex && (
                <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute cursor-pointer right-2 md:right-[70px] top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
                >
                    <ArrowRight size={18} className="text-white" />
                </motion.button>
            )}

            <style jsx>{`
                .bg-grid-white\\/\\[0\\.02\\] {
                    background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
                }
            `}</style>
        </motion.div>
    );
});

PopularCategoriesSlider.displayName = 'PopularCategoriesSlider';

export default PopularCategoriesSlider;