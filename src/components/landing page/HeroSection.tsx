'use client'
import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Star, ShoppingBag, Play } from 'lucide-react'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingElements = [
    { icon: Zap, color: 'text-yellow-400', delay: 0, x: '15%', y: '20%' },
    { icon: Star, color: 'text-pink-400', delay: 1.2, x: '85%', y: '15%' },
    { icon: Sparkles, color: 'text-blue-400', delay: 2.1, x: '10%', y: '80%' },
    { icon: ShoppingBag, color: 'text-purple-400', delay: 0.8, x: '90%', y: '75%' },
  ]

  const gradientBalls = [
    { 
      gradient: 'from-cyan-400 via-blue-500 to-purple-600', 
      size: 'w-96 h-96', 
      position: 'top-0 -right-20',
      delay: 0
    },
    { 
      gradient: 'from-pink-400 via-rose-500 to-orange-500', 
      size: 'w-80 h-80', 
      position: '-bottom-10 -left-10',
      delay: 1.5
    },
    { 
      gradient: 'from-violet-400 via-purple-500 to-indigo-600', 
      size: 'w-64 h-64', 
      position: 'top-1/3 left-1/4',
      delay: 0.8
    },
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(168, 85, 247, 0.2) 25%, 
            rgba(236, 72, 153, 0.2) 50%, 
            transparent 70%)`
        }}
      />

      {/* Animated gradient orbs */}
      {gradientBalls.map((ball, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ 
            duration: 2, 
            delay: ball.delay,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3
          }}
          className={`absolute ${ball.size} ${ball.position} rounded-full blur-3xl 
            bg-gradient-to-r ${ball.gradient} mix-blend-screen`}
        />
      ))}

      {/* Floating icons */}
      {floatingElements.map((element, i) => (
        <motion.div
          key={i}
          className={`absolute ${element.color} opacity-60`}
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <element.icon size={32} />
        </motion.div>
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left content */}
          <motion.div 
            style={{ y: y1 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm opacity-75 animate-pulse" />
                <div className="relative px-6 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/90 text-sm font-medium">Live Now</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-8xl font-black leading-none">
                <span className="block text-white mb-4">NEXT-GEN</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
                  TECH
                </span>
                <motion.span 
                  className="block text-white/60 text-2xl md:text-3xl font-light mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Revolution Starts Here
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Experience the future with our cutting-edge collection of revolutionary gadgets and smart devices that redefine possibility.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl text-white font-semibold text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
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
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-8 pt-8"
            >
              {[
                { number: "50K+", label: "Happy Customers" },
                { number: "99%", label: "Satisfaction Rate" },
                { number: "24/7", label: "Support" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Product showcase */}
          <motion.div 
            style={{ y: y2 }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 scale-110 animate-pulse" />
              
              {/* Product container */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotateX: [0, 5, 0],
                    rotateY: [0, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative aspect-square"
                >
                  <img
                    src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981601/slide_s36khb.png"
                    alt="Next-gen tech device"
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                  
                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      animate={{
                        x: [Math.random() * 300, Math.random() * 300],
                        y: [Math.random() * 300, Math.random() * 300],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  )
}

export default HeroSection