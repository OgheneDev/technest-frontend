'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { Mail, Lock, LogIn, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { login } from '../../api/auth/requests'

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      await Swal.fire({
        title: 'Success!',
        text: 'Logged in successfully',
        icon: 'success',
        confirmButtonColor: '#4F46E5'
      });
      router.push('/');
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
            className="rounded-md bg-red-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-xl shadow-lg bg-white/70 backdrop-blur-sm text-gray-900 p-6 space-y-4">
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

        {/* Password field */}
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
        </div>

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </div>
      </div>

      <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
        <button
          type="submit"
          disabled={isLoading}
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
              <LogIn className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
            </span>
          )}
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
