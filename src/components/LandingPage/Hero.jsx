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
      description: 'Save up to 70% off on headsets, cases, and so much more. New products added every week.'
    },
    {
      id: 2,
      name: 'Apple Watch Edition Base Station',
      image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730981600/slide2_wzedpx.png',
      description: 'The ultimate charging hub for iPhone, Apple watch and AirPods.'
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
    <div>
      <section className='hero w-[90%] md:mt-[40px] pt-[40px] mx-auto md:mx-[100px] md:w-auto'>
        <div
          className="slider relative w-full overflow-hidden"
          ref={sliderRef}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-inner flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slider.map((card, index) => (
              <div
                key={index}
                className="card w-full flex-shrink-0 flex md:items-start md:gap-[30px] md:justify-between bg-[#f8f9fa] rounded-[10px] md:p-[100px] items-center p-[30px]"
              >
                <motion.div 
                  className="text-content md:w-[50%] flex flex-col gap-[20px]"
                  initial="hidden"
                  animate={currentSlide === index ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <motion.h1 
                    className='font-bold text-xl md:text-5xl text-[#343a40]'
                    variants={textVariants}
                  >
                    {card.name}
                  </motion.h1>
                  <motion.p 
                    className='text-[#777] text-[18px] hidden md:block'
                    variants={textVariants}
                  >
                    {card.description}
                  </motion.p>
                  <Link to='/shop'>
                  <motion.button 
                    className='text-white bg-[#6610f2] w-fit px-[20px] md:px-[35px] py-[5px] md:py-[13px] md:font-semibold rounded-full'
                    variants={textVariants}
                  >
                    Shop Now
                  </motion.button>
                  </Link>
                </motion.div>
                <div className="image-container">
                  <img src={card.image} alt={card.name} className='w-[150px] md:w-[500px]' />
                </div>
              </div>
            ))}
          </div>

          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-[#6610f2] hover:text-white shadow-md"
            >
              <ArrowLeft size={15} />
            </button>
          )}
          {currentSlide < slider.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-[#6610f2] hover:text-white"
            >
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </section>
      <div className="ship md:hidden flex gap-[30px] items-center justify-center border-b py-[30px]">
        <Truck size={40} className='text-[#0d6efd]' />
        <h2 className='font-bold text-[#343a40]'>Free Shipping & Returns</h2>
      </div> 
    <div className="facts hidden md:flex flex-col md:flex-row md:justify-between gap-7 border-b   py-10 px-[100px] md:pb-8">
    {[
      { icon: Truck, text: 'Free Shipping & Returns' },
      { icon: CircleDollarSign, text: 'Money Back Guarantee' },
      { icon: CalendarClock, text: 'Online Support 24/7' },
      { icon: LockOpen, text: 'Secure Payment' },
    ].map(({ icon: Icon, text }, index) => (
      <div key={index} className="flex gap-3 items-center">
        <Icon size={45} className="text-bs-indigo" />
        <span className="text-xl font-semibold">{text}</span>
      </div>
    ))}
  </div>
    </div>
  );
};

export default Hero;