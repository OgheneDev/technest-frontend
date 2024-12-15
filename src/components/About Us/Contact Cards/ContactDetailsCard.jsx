import React from 'react'
import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ContactDetailsCard = () => {
  return (
    <motion.div 
     initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    className='border border-grey-dark rounded-[15px] p-7'>
      <div className="flex gap-2 mb-5 items-center">
        <Phone size={20} />
        <h3 className='text-xl text-dark font-bold'>123 456 7890</h3>
      </div>
      <p className='text-grey mb-2'>Monday to Saturday - 8am - 6pm</p>
      <Link to='/contact-us' className='text-[#6610f2] underline'>Frequently asked Questions</Link>
    </motion.div>
  )
}

export default ContactDetailsCard
