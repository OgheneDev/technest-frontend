"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X, AlertTriangle } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
}

const Toast = ({
  show,
  message,
  type,
  duration = 4000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  // Helper function to get styles based on type
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          boxShadow: "0 20px 60px -10px rgba(16, 185, 129, 0.3)",
          bg: "bg-gradient-to-r from-emerald-500/95 to-emerald-600/95",
          border: "border-emerald-400/20",
          icon: <CheckCircle2 className="h-5 w-5" />,
        };
      case "error":
        return {
          boxShadow: "0 20px 60px -10px rgba(239, 68, 68, 0.3)",
          bg: "bg-gradient-to-r from-red-500/95 to-red-600/95",
          border: "border-red-400/20",
          icon: <AlertCircle className="h-5 w-5" />,
        };
      case "warning":
        return {
          boxShadow: "0 20px 60px -10px rgba(245, 158, 11, 0.3)",
          bg: "bg-gradient-to-r from-amber-500/95 to-amber-600/95",
          border: "border-amber-400/20",
          icon: <AlertTriangle className="h-5 w-5" />,
        };
      default:
        return {
          boxShadow: "0 20px 60px -10px rgba(16, 185, 129, 0.3)",
          bg: "bg-gradient-to-r from-emerald-500/95 to-emerald-600/95",
          border: "border-emerald-400/20",
          icon: <CheckCircle2 className="h-5 w-5" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed top-6 right-6 z-50"
        >
          <motion.div
            initial={{ boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }}
            animate={{ boxShadow: styles.boxShadow }}
            className={`flex items-center gap-3 pl-5 pr-4 py-4 rounded-2xl backdrop-blur-md border min-w-[320px] ${styles.bg} ${styles.border} text-white`}
          >
            {/* Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.1,
              }}
            >
              <div className="bg-white/20 p-1.5 rounded-full">
                {styles.icon}
              </div>
            </motion.div>

            {/* Message */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-medium flex-1 text-sm"
            >
              {message}
            </motion.span>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-b-2xl origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Toast };
