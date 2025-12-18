"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

const HeroSection = () => {
  const features = [
    { text: "Lightning Fast", icon: Zap },
    { text: "Secure by Default", icon: Shield },
    { text: "Global Scale", icon: Globe },
  ];

  return (
    <section className="relative min-h-screen py-10 md:py-15 bg-zinc-950 overflow-hidden">
      {/* Minimal accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-amber-950/20" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl space-y-8 text-center">
          {/* Minimal Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <span className="inline-block px-4 py-1.5 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium tracking-wide">
              NOW AVAILABLE
            </span>
          </motion.div>

          {/* Hero Headline - Clean & Bold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-none">
              Build the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                impossible
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            The platform that scales with your ambition. Transform ideas into
            reality with tools built for creators.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-black cursor-pointer transition-colors flex justify-center items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-zinc-700 hover:border-zinc-600 rounded-lg cursor-pointer text-white font-medium transition-colors"
            >
              View Demo
            </motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-4 justify-center"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-zinc-300">{feature.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
