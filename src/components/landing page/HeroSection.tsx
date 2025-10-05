'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center">
              <div className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white/90 text-sm font-medium">Live Now</span>
              </div>
            </div>

            {/* Main heading */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black leading-none">
                <span className="block text-white mb-4">NEXT-GEN</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  TECH
                </span>
                <span className="block text-white/60 text-xl md:text-2xl font-light mt-4">
                  Revolution Starts Here
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base text-white/70 max-w-lg leading-relaxed">
              Experience the future with our cutting-edge collection of revolutionary gadgets and smart devices that redefine possibility.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl text-white font-semibold text-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Explore Collection</span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </div>
              </motion.button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 max-w-md">
              {stats.map((stat, i) => (
                <div key={i} className="text-center px-2">
                  <div className="text-lg sm:text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Product showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl" />
            
            {/* Product container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="relative aspect-square">
                <img
                  src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981601/slide_s36khb.png"
                  alt="Next-gen tech device"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  )
}

export default HeroSection