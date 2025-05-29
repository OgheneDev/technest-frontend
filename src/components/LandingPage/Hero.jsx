import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Truck, CircleDollarSign, CalendarClock, LockOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slider = [
    {
      id: 1,
      name: 'New Deals Just Dropped',
      image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981601/slide_s36khb.png',
      description: 'Save up to 70% off on headsets, cases, and so much more. New products added every week.',
      bgColor: 'from-purple-100 to-blue-50'
    },
    {
      id: 2,
      name: 'Apple Watch Edition Base Station',
      image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981600/slide2_wzedpx.png',
      description: 'The ultimate charging hub for iPhone, Apple watch and AirPods.',
      bgColor: 'from-blue-50 to-indigo-100'
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slider.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,  // Duration for each element's animation
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,  // Delay between each child animation
        delayChildren: 0.3,    // Initial delay before starting animations
        duration: 0.5         // Overall container animation duration
      }
    }
  };

  return (
    <div className="mt-16">
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12'>
        <div
          className="relative overflow-hidden rounded-2xl shadow-lg"
          ref={sliderRef}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slider.map((card, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 bg-gradient-to-r ${card.bgColor} relative overflow-hidden`}
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-grid-gray-900/[0.2] -skew-y-12" />
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20">
                  <motion.div 
                    className="text-content md:w-[45%] text-center md:text-left z-10"
                    initial="hidden"
                    animate={currentSlide === index ? "visible" : "hidden"}
                    variants={containerVariants}
                  >
                    <motion.h1 
                      className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                      variants={textVariants}
                    >
                      {card.name}
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-gray-600 mb-8 hidden md:block"
                      variants={textVariants}
                    >
                      {card.description}
                    </motion.p>
                    <Link to="/shop">
                      <motion.button 
                        className="inline-flex items-center px-8 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        variants={textVariants}
                      >
                        Shop Now
                        <ArrowRight size={20} className="ml-2" />
                      </motion.button>
                    </Link>
                  </motion.div>
                  <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
                    <motion.img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-[250px] md:w-[500px] mx-auto object-contain"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Navigation Buttons */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slider.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-gray-900 w-8' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 group"
              >
                <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
              </button>
            )}
            {currentSlide < slider.length - 1 && (
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 group"
              >
                <ArrowRight size={20} className="text-gray-600 group-hover:text-gray-900" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            { [
              { icon: Truck, text: 'Free Shipping & Returns', desc: 'On all orders over $99' },
              { icon: CircleDollarSign, text: 'Money Back Guarantee', desc: '30 days money back' },
              { icon: CalendarClock, text: 'Online Support 24/7', desc: 'Technical support 24/7' },
              { icon: LockOpen, text: 'Secure Payment', desc: '100% secure checkout' }
            ].map(({ icon: Icon, text, desc }, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                  <Icon size={32} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{text}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;