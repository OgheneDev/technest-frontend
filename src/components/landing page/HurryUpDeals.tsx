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
      className='pb-[50px] px-[20px] md:px-[60px] bg-white'
    >
      <motion.h3
        variants={itemVariants}
        className="font-bold text-grey-dark text-xl md:text-3xl mb-[20px] text-gray-900"
      >
        Hurry Up Deals
      </motion.h3>

      <div className="deals flex flex-col md:flex-row gap-[20px]">
        <motion.div 
          variants={itemVariants}
          className="bg-[url('https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-bg-1_xelc76.jpg')] md:items-center rounded-[15px] w-full flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto text-white"
        >
          <div className="text-content flex md:items-start flex-col gap-[20px]">
            <motion.h3 
              variants={itemVariants}
              className='text-2xl md:text-4xl font-bold'
            >
              Airpods <br /> Experience
            </motion.h3>
            <Link href='/shop'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-purple-500 rounded-full py-[5px] px-[20px] cursor-pointer'
              >
                Shop Now
              </motion.button>
            </Link>
          </div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="image-container relative"
          >
            <Image 
              src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-1_t09pru.png"
              alt="Airpods"
              width={170}
              height={170}
              className='w-[100px] md:w-[170px] cursor-pointer'
            />
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-[#f8f9fa] w-full flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto items-center text-grey-dark rounded-[15px]"
        >
          <div className="text-content md:w-[50%] flex flex-col md:items-start gap-[20px]">
            <motion.h3 
              variants={itemVariants}
              className='text-2xl md:text-4xl font-bold text-gray-900'
            >
              New 3 in 1 <br/> wireless charger
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className='text-[#777] hidden md:block'
            >
              Save up to 50% off on new arrivals
            </motion.p>
            <Link href='/shop'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-purple-500 rounded-full py-[5px] w-fit px-[25px] cursor-pointer'
              >
                Shop Now
              </motion.button>
            </Link>
          </div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="image-container relative"
          >
            <Image 
              src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-2_z6asph.png"
              alt="Wireless Charger"
              width={240}
              height={240}
              className='w-[150px] md:w-[240px] cursor-pointer'
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HurryUpDeals
