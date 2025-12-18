"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HurryUpDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-zinc-950 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hurry Up <span className="text-emerald-400">Deals</span>
          </h2>
          <p className="text-zinc-400">
            Limited time offers you don't want to miss
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            variants={itemVariants}
            className="group relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-bg-1_xelc76.jpg')] bg-cover bg-center opacity-20" />

            <div className="relative flex justify-between items-center p-8 md:p-10">
              <div className="flex flex-col gap-6 z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Airpods <br /> Experience
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    Get a new one today!
                  </p>
                </div>

                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 rounded-lg py-3 px-6 text-sm cursor-pointer hover:bg-white/90 transition-all inline-block"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Image
                  src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-1_t09pru.png"
                  alt="Airpods"
                  width={170}
                  height={170}
                  className="w-[120px] md:w-[170px] drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Wireless Charger Deal Card */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="relative flex justify-between items-center p-8 md:p-10">
              <div className="flex flex-col gap-6 z-10 flex-1">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    New 3 in 1 <br /> Wireless Charger
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base">
                    Save up to 50% off on new arrivals
                  </p>
                </div>

                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg py-3 px-6 text-sm cursor-pointer transition-all inline-block"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Image
                  src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-2_z6asph.png"
                  alt="Wireless Charger"
                  width={240}
                  height={240}
                  className="w-[150px] md:w-[240px] drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HurryUpDeals;
