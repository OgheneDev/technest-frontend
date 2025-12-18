"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { login } from "../../api/auth/requests";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      await Swal.fire({
        title: "Success!",
        text: "Logged in successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#0a0a0a",
        color: "#fff",
      });
      window.location.href = "/";
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <AnimatePresence>
        {error && (
          <motion.div
            className="rounded-lg bg-red-500/10 border border-red-500/30 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-400">{error}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-6 space-y-5">
        {/* Email field */}
        <div>
          <div className="flex gap-2 items-center mb-2">
            <Mail className="h-4 w-4 text-zinc-400" />
            <label htmlFor="email" className="text-sm text-zinc-300">
              Email address
            </label>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                     text-white placeholder:text-zinc-500 
                     focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                     transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <div className="flex gap-2 items-center mb-2">
            <Lock className="h-4 w-4 text-zinc-400" />
            <label htmlFor="password" className="text-sm text-zinc-300">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                       text-white placeholder:text-zinc-500 
                       focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                       transition-all duration-200 pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 
                   rounded-lg text-sm font-medium 
                   bg-emerald-500 hover:bg-emerald-400 text-black
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500/50
                   transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              Sign in
            </>
          )}
        </button>
      </motion.div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-zinc-950 text-zinc-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Return to home
        </Link>
      </div>
    </motion.form>
  );
};

export default LoginForm;
