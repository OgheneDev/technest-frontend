'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const HurryUpDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Variants for section and item animations
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
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className='relative py-[50px] px-[20px] md:px-[60px] bg-gradient-to-b from-black to-gray-900 overflow-hidden'
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-purple-500/3 to-pink-500/3" />
      
      {/* Subtle floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-500/10 rounded-full blur-3xl" />

      <motion.h3
        variants={itemVariants}
        className="relative z-10 font-bold text-xl md:text-3xl mb-[20px] text-white"
      >
        Hurry Up Deals
      </motion.h3>

      <div className="relative z-10 deals flex flex-col md:flex-row gap-[20px]">
        <motion.div 
          variants={itemVariants}
          className="group relative bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-white/10 rounded-[20px] w-full flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto text-white overflow-hidden hover:border-white/20 transition-all duration-300"
        >
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-purple-600/20 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-bg-1_xelc76.jpg')] bg-cover bg-center opacity-30 rounded-[20px]" />
          
          <div className="relative z-10 text-content flex md:items-start flex-col gap-[20px]">
            <motion.h3 
              variants={itemVariants}
              className='text-2xl md:text-4xl font-bold'
            >
              Airpods <br /> Experience
            </motion.h3>
            <Link href='/shop'>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className='bg-white/90 backdrop-blur-sm text-purple-600 rounded-full py-[8px] px-[25px] cursor-pointer font-medium hover:bg-white transition-all duration-300 shadow-lg'
              >
                Shop Now
              </motion.button>
            </Link>
          </div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 image-container"
          >
            <Image 
              src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-1_t09pru.png"
              alt="Airpods"
              width={170}
              height={170}
              className='w-[100px] md:w-[170px] cursor-pointer drop-shadow-2xl'
            />
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 w-full flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto items-center rounded-[20px] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          
          <div className="relative z-10 text-content md:w-[50%] flex flex-col md:items-start gap-[20px]">
            <motion.h3 
              variants={itemVariants}
              className='text-2xl md:text-4xl font-bold text-white'
            >
              New 3 in 1 <br/> wireless charger
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className='text-white/70 hidden md:block'
            >
              Save up to 50% off on new arrivals
            </motion.p>
            <Link href='/shop'>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full py-[8px] w-fit px-[25px] cursor-pointer font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg'
              >
                Shop Now
              </motion.button>
            </Link>
          </div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: -5, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 image-container"
          >
            <Image 
              src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-2_z6asph.png"
              alt="Wireless Charger"
              width={240}
              height={240}
              className='w-[150px] md:w-[240px] cursor-pointer drop-shadow-2xl'
            />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </motion.section>
  )
}

export default HurryUpDeals