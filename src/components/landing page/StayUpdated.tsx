'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const StayUpdated = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasAnimated])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Successfully subscribed!')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
      className='py-10 px-5 md:py-16 md:px-[60px] bg-gradient-to-r from-gray-50 to-gray-100'
    >
      <article className='text-center mb-8'>
        <motion.h2
          variants={itemVariants}
          className='text-3xl md:text-4xl text-gray-900 mb-4 font-bold'
        >
          Stay Updated
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className='text-gray-600 max-w-2xl mx-auto'
        >
          Subscribe to our newsletter to receive updates on new products, special offers, and tech tips.
        </motion.p>
      </article>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className='flex flex-col md:flex-row md:items-center justify-center gap-4 max-w-xl mx-auto'
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          required
          className='flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none
                    placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500
                    focus:border-transparent transition-all duration-200
                    hover:border-gray-400'
        />
        <Button
          disabled={isLoading}
          className='w-full md:w-auto px-8 py-3 text-sm bg-gray-900'
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : 'Subscribe'}
        </Button>
      </motion.form>
    </motion.div>
  )
}

export default StayUpdated