import React from 'react'
import { Home, ChevronRight } from 'lucide-react'

const Breadcrumbs = () => {
  return (
    <div className='flex gap-[15px] text-[12px] items-center mb-[50px] text-grey uppercase'>
      <Home size={12} />
      <ChevronRight size={10} />
      <p>Order Tracking</p>
    </div>
  )
}

export default Breadcrumbs
