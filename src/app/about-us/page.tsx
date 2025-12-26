"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Headphones,
  Watch,
  Zap,
  Shield,
  Package,
  Users,
  TrendingUp,
  Cable,
  Battery,
  BatteryCharging,
  Tablet,
  Laptop,
} from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products Sold" },
    { number: "500+", label: "Tech Products" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Authenticity Guaranteed",
      description:
        "Every device we sell is 100% authentic with manufacturer warranties included.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      description:
        "Get your tech delivered within 24-48 hours across major cities.",
    },
    {
      icon: Package,
      title: "Premium Packaging",
      description:
        "Your devices arrive in pristine condition with secure, eco-friendly packaging.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "Our tech specialists are available 24/7 to help you make the right choice.",
    },
  ];

  const categories = [
    { icon: Smartphone, name: "Cases" },
    { icon: Shield, name: "Screen Protectors" },
    { icon: Zap, name: "MagSafe" },
    { icon: Cable, name: "Cables" },
    { icon: Battery, name: "Chargers" },
    { icon: BatteryCharging, name: "Power Banks" },
    { icon: Headphones, name: "Headphones" },
    { icon: Watch, name: "Smartwatches" },
    { icon: Tablet, name: "Tablets" },
    { icon: Laptop, name: "Laptops" },
    { icon: Package, name: "Accessories" },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-zinc-950" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <span className="inline-block px-4 py-1.5 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium tracking-wide">
              ABOUT TECHNEST
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Your Trusted
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Tech Partner
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              TechNest is where innovation meets reliability. We curate the
              finest selection of devices and accessories to power your digital
              lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-zinc-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our Story
              </h2>

              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Founded in 2020, TechNest began with a simple mission: to make
                  premium technology accessible to everyone. We saw a gap in the
                  market for a platform that combined authentic products, expert
                  guidance, and exceptional service.
                </p>

                <p>
                  Today, we've grown into a trusted destination for tech
                  enthusiasts and everyday users alike. From the latest flagship
                  smartphones to essential accessories that enhance your
                  experience, every product in our catalog is carefully selected
                  and verified for authenticity.
                </p>

                <p>
                  We believe technology should empower, not complicate. That's
                  why our team of tech specialists works tirelessly to ensure
                  you get not just a product, but the perfect solution for your
                  needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We're committed to delivering an exceptional experience at every
              touchpoint
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore our carefully curated collection of premium tech products
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-full hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-medium">
                    {category.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-emerald-950/20 to-amber-950/20" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to upgrade your tech?
            </h2>
            <p className="text-xl text-zinc-400">
              Join thousands of satisfied customers who trust TechNest for their
              technology needs
            </p>

            <Link href={"/shop"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-emerald-500 font-semibold hover:bg-emerald-400 rounded-lg text-black cursor-pointer transition-colors inline-flex items-center gap-2"
              >
                <span>Start Shopping</span>
                <TrendingUp className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
