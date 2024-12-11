import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumbs = () => {
  return (
    <div className='flex gap-8 justify-center text-[20px] font-semibold py-7 px-5 flex-wrap text-grey'>
       <Link to='/cart' className='hover:text-[#3740ea]'>
         Shopping Cart
       </Link>

       <ChevronRight size={25} />

       <Link to='/checkout' className='hover:text-[#3740ea]'>
         Checkout
       </Link>

       <ChevronRight size={25} />

       <Link to='/order-complete' className='hover:text-[#3740ea]'>
         Order Complete
       </Link>
    </div>
  )
}

export default Breadcrumbs

