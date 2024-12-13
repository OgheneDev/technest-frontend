import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const ContactUsBanner = () => {
  return (
    <section className='bg-[#f1f4f9] p-[70px]'>
          <div className='path flex gap-[15px] items-center uppercase text-[12px] text-grey  justify-center'>
          <Link to='/'>
           <Home size={15} />
          </Link>
    
          <ChevronRight  size={10}/>
    
          <h6>Contact Us</h6>
          </div>
          <h1 className='text-center text-2xl font-semibold md:fomt-bold text-dark'>Contact Us</h1>
    </section>
  )
}

export default ContactUsBanner
