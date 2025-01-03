import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTestimonialsContext } from "../../context/TestimonialsContext";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const SkeletonTestimonial = () => (
  <div className="snap-center shrink-0 w-[100vw] md:w-[49%] p-[20px] bg-white animate-pulse">
    <div className="flex gap-[20px] items-start">
      <div className="bg-gray-300 w-[70px] h-[70px] rounded-full"></div>
      <div className="text-content flex flex-col gap-[10px] max-w-full">
        <div className="bg-gray-300 h-[20px] w-2/3 rounded-md"></div>
        <div className="bg-gray-300 h-[15px] w-1/3 rounded-md"></div>
        <div className="flex gap-1 mb-2">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 h-[10px] w-[10px] rounded-full"
              ></div>
            ))}
        </div>
        <div className="bg-gray-300 h-[15px] w-full rounded-md"></div>
        <div className="bg-gray-300 h-[15px] w-3/4 rounded-md"></div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const {
    testimonials,
    fetchTestimonials,
    currentSlide,
    itemsPerSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useTestimonialsContext();

  const sliderRef = useRef(null);

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Variants for animations
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

  // Render stars for testimonial ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
      className="py-3 md:px-[100px]"
    >
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-grey-dark font-semibold text-xl mb-[30px] text-center"
      >
        Customer Testimonials
      </motion.h2>

      {/* Slider Container */}
      <div className="relative">
        {/* Previous Button */}
        {currentSlide > 0 && (
          <motion.button
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 md:left-0 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            aria-label="Previous slide"
          >
            <ArrowLeft size={15} />
          </motion.button>
        )}

        {/* Testimonials Slider */}
        <div
          className="testimonial-slider flex overflow-x-auto snap-x snap-mandatory space-x-[20px] px-4"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.length === 0 ? (
            // Show 3 skeletons while loading
            Array(3)
              .fill()
              .map((_, index) => <SkeletonTestimonial key={index} />)
          ) : (
            testimonials
              .slice(
                currentSlide * itemsPerSlide,
                currentSlide * itemsPerSlide + itemsPerSlide
              )
              .map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="snap-center shrink-0 w-[100vw] md:w-[49%] p-[20px] bg-white cursor-pointer"
                >
                  <div className="flex gap-[20px] items-start">
                    <motion.img
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-[70px] rounded-full"
                    />
                    <div className="text-content flex flex-col gap-[10px] max-w-full overflow-hidden">
                      <motion.h3
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-semibold text-grey-dark text-[18px]"
                      >
                        {testimonial.name}{" "}
                        <span className="text-[#9d9fa3] text-[13px]">
                          - {testimonial.date}
                        </span>
                      </motion.h3>
                      <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }} 
                        className="flex gap-1 mb-2"
                      >
                        {renderStars(testimonial.rating || 4)}
                      </motion.div>
                      <motion.p
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[#9d9fa3] text-[15px] break-words whitespace-normal"
                      >
                        {testimonial.testimonial}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>

        {/* Next Button */}
        {currentSlide <
          Math.ceil(testimonials.length / itemsPerSlide) - 1 && (
          <motion.button
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 md:right-0 top-1/3 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            aria-label="Next slide"
          >
            <ArrowRight size={15} />
          </motion.button>
        )}
      </div>
    </motion.section>
  );
};

export default Testimonials;