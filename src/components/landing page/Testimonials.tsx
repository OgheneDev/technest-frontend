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
    <section ref={sectionRef} className=" py-8 md:py-15 bg-gradient-to-tr from-blue-200 to-violet-500">
        <motion.article variants={containerVariants} className="text-center mb-7 md:px-12">
            <motion.span
             initial={{ opacity: 0, y: -50 }}
             animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
             transition={{ duration: 0.5 }}
             className="uppercase text-[#0A2F1E] text-[12px]">Our Testimonials</motion.span>
            <motion.h2
             initial={{ opacity: 0, y: -50 }}
             animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
             transition={{ duration: 0.6 }}
             className="text-2xl font-bold text-[#161E2D] mb-3">What People Say</motion.h2>
            <motion.p
             initial={{ opacity: 0, y: -50 }}
             animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
             transition={{ duration: 0.7 }}
             className='text-sm text-gray-600 md:px-[200px]'>Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</motion.p>
        </motion.article>
        <TestimonialSlider />
    </section>
  )
}

export default Testimonials