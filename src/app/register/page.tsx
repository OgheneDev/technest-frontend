'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import RegisterForm from '@/components/register page/RegisterForm'
import logo from '@/assets/images/logo.png'

const SignupPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
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
            <div className="bg-gray-900 p-4 rounded-xl shadow-md">
              <Image
                src={logo}
                alt='Logo'
                width={180}
                height={60}
                className='brightness-200'
              />
            </div>
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create your account
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              <span className="inline-flex items-center">
                Sign in here
                <LogIn className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <RegisterForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;