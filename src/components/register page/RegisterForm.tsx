'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  LogIn,
  AlertCircle,
  Loader2,
  User,
  Eye,
  EyeOff,
  Phone
} from 'lucide-react';
import { register } from '@/api/auth/requests';
import PasswordStrength from '../password/PasswordStrength';
import PasswordChecklist from '../password/PasswordChecklist';

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
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isPasswordValid()) {
      setError('Please create a stronger password');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        role: 'user'
      });
      await Swal.fire({
        title: 'Success!',
        text: 'Your account has been created successfully',
        icon: 'success',
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: '#0ea5e9'
      });
      router.push('/login');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordChecks).every(check => check === true);
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
            className="rounded-md bg-red-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-xl shadow-lg bg-white/70 backdrop-blur-sm text-gray-900 p-6 space-y-4">
        {/* Name fields row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* First Name field */}
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <User className="h-5 w-5 text-gray-500" />
              <label htmlFor="firstName" className="text-sm">First Name</label>
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="First Name"
            />
          </div>

          {/* Last Name field */}
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <User className="h-5 w-5 text-gray-500" />
              <label htmlFor="lastName" className="text-sm">Last Name</label>
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Contact fields row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Email field */}
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <label htmlFor="email" className="text-sm">Email address</label>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="Email address"
            />
          </div>

          {/* Phone Number field */}
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Password fields */}
        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <Lock className="h-5 w-5 text-gray-500" />
            <label htmlFor="password" className="text-sm">Password</label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          
          {formData.password && (
            <div className="mt-2 space-y-2">
              <PasswordStrength passwordChecks={passwordChecks} />
              <PasswordChecklist passwordChecks={passwordChecks} />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <Lock className="h-5 w-5 text-gray-500" />
            <label htmlFor="confirm-password" className="text-sm">Confirm Password</label>
          </div>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border
                       border-gray-300 bg-white/50 placeholder-gray-500 text-gray-900 
                       focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white
                       transition-all duration-200 focus:z-10"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
        <button
          type="submit"
          disabled={isLoading || !isPasswordValid() || formData.password !== formData.confirmPassword}
          className="group relative w-full flex justify-center py-3 px-4 
                   border border-transparent text-sm font-medium rounded-md 
                   text-white bg-indigo-600 hover:bg-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-indigo-500 transition-colors cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-violet-300 group-hover:text-violet-200" />
            </span>
          )}
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </motion.div>
    </motion.form>
  )
}

export default RegisterForm