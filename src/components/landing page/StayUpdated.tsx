"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";

const StayUpdated = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-zinc-950 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" p-8 md:p-12 text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl text-white mb-3 font-bold">
              Stay <span className="text-emerald-400">Updated</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates on new products,
              special offers, and tech tips.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg outline-none
                        placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
                        transition-all duration-200 text-white"
            />
            <Button
              disabled={isLoading}
              className="w-full sm:w-auto cursor-pointer px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default StayUpdated;
