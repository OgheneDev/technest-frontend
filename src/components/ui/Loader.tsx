import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated brand name */}
        <div className="flex items-center gap-1">
          {["T", "e", "c", "h", "N", "e", "s", "t"].map((letter, i) => (
            <motion.span
              key={i}
              className="text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, -20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              style={{
                color: i === 4 ? "#10b981" : "#ffffff", // "N" in emerald, rest in white
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Spinning ring underneath */}
        <motion.div
          className="w-16 h-16 border-4 border-zinc-800 border-t-emerald-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
