"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TestimonialSlider from "./TestimonialSlider";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "auto";
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
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-zinc-950 overflow-hidden"
    >
      {/* Add the same gradient overlay as Hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-1.5 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium tracking-wide">
              TESTIMONIALS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            What People <span className="text-emerald-400">Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Our seasoned team excels in real estate with years of successful
            market navigation, offering informed decisions and optimal results.
          </motion.p>
        </motion.div>

        <div className="relative">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
