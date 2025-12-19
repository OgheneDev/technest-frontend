"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  UserPlus,
  AlertCircle,
  Loader2,
  User,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import PasswordStrength from "../password/PasswordStrength";
import PasswordChecklist from "../password/PasswordChecklist";

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
  });

  const validatePassword = (pass: string) => {
    setPasswordChecks({
      minLength: pass.length >= 8,
      hasNumber: /\d/.test(pass),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      hasUpper: /[A-Z]/.test(pass),
      hasLower: /[a-z]/.test(pass),
    });
  };

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid()) {
      setError("Please create a stronger password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        role: "user",
      });
      await Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully",
        icon: "success",
        background: "#0a0a0a",
        color: "#fff",
        confirmButtonColor: "#10b981",
      });
      router.push("/login");
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordChecks).every((check) => check === true);
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
        {/* Name fields row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name field */}
          <div>
            <div className="flex gap-2 items-center mb-2">
              <User className="h-4 w-4 text-zinc-400" />
              <label htmlFor="firstName" className="text-sm text-zinc-300">
                First Name
              </label>
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                       text-white placeholder:text-zinc-500 
                       focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                       transition-all duration-200"
              placeholder="John"
            />
          </div>

          {/* Last Name field */}
          <div>
            <div className="flex gap-2 items-center mb-2">
              <User className="h-4 w-4 text-zinc-400" />
              <label htmlFor="lastName" className="text-sm text-zinc-300">
                Last Name
              </label>
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                       text-white placeholder:text-zinc-500 
                       focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                       transition-all duration-200"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Contact fields row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="john@example.com"
            />
          </div>

          {/* Phone Number field */}
          <div>
            <div className="flex gap-2 items-center mb-2">
              <Phone className="h-4 w-4 text-zinc-400" />
              <label htmlFor="phoneNumber" className="text-sm text-zinc-300">
                Phone Number
              </label>
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                       text-white placeholder:text-zinc-500 
                       focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                       transition-all duration-200"
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>

        {/* Password fields */}
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
              placeholder="Create a strong password"
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

          {formData.password && (
            <div className="mt-3 space-y-3">
              <PasswordStrength passwordChecks={passwordChecks} />
              <PasswordChecklist passwordChecks={passwordChecks} />
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <Lock className="h-4 w-4 text-zinc-400" />
            <label htmlFor="confirm-password" className="text-sm text-zinc-300">
              Confirm Password
            </label>
          </div>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                       text-white placeholder:text-zinc-500 
                       focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                       transition-all duration-200 pr-10"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: isSigningUp ? 1 : 1.02 }}
        whileTap={{ scale: isSigningUp ? 1 : 0.98 }}
      >
        <button
          type="submit"
          disabled={
            isSigningUp ||
            !isPasswordValid() ||
            formData.password !== formData.confirmPassword
          }
          className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 
                   rounded-lg text-sm font-medium 
                   bg-emerald-500 hover:bg-emerald-400 text-black
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500/50
                   transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSigningUp ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              Create Account
            </>
          )}
        </button>
      </motion.div>

      <div className="text-center text-xs text-zinc-500">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-emerald-400 hover:text-emerald-300"
        >
          Privacy Policy
        </Link>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
