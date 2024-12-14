import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'

const Breadcrumbs = () => {
  return (
    <div className='flex gap-[15px] text-[12px] items-center mb-[50px] md:mb-[30px] p-5 md:px-[100px] text-grey uppercase'>
      <Link to='/'>
      <Home size={12} />
      </Link>
      <ChevronRight size={10} />
      <p>Order Tracking</p>
    </div>
  )
}

export default Breadcrumbs
