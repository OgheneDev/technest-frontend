"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import LoginForm from "@/components/login page/LoginForm";
import logo from "@/assets/images/logo.png";

const LoginPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-lg">
              <Image
                src={logo}
                alt="Logo"
                width={180}
                height={60}
                className="brightness-200"
              />
            </div>
          </motion.div>

          <motion.h2
            className="mt-6 text-center text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome <span className="text-emerald-400">Back</span>
          </motion.h2>

          <motion.p
            className="mt-2 text-center text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span className="inline-flex items-center">
                Create account
                <UserPlus className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
