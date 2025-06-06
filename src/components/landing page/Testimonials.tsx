"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TestimonialSlider from './TestimonialSlider'

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-15 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />

      <motion.article 
        variants={containerVariants} 
        className="relative z-10 text-center mb-7 md:px-12"
      >
        <motion.span 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-cyan-300 text-[12px] uppercase font-medium mb-4"
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
          Our Testimonials
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-white mb-3"
        >
          What People Say
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 0.7 }}
          className='text-sm md:text-base text-white/70 md:px-[200px] leading-relaxed'
        >
          Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.
        </motion.p>
      </motion.article>
      
      <div className="relative z-10">
        <TestimonialSlider />
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  )
}

export default Testimonials