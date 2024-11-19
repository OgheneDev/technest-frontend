import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const AccountBanner = () => {
  return (
    <section className='bg-[#f1f4f9] p-[70px]'>
      <div className="path flex gap-[15px] items-center uppercase text-[12px]  justify-center">
        <Link to='/' className='text-bs-indigo font-semibold'>
          Home
        </Link>

        <ChevronRight  size={10}/>

        <Link to='/shop' className='text-bs-indigo font-semibold'>
         Shop
        </Link>

        <ChevronRight size={10} />

        <h6>Account</h6>
      </div>

      <h1 className='text-center text-2xl font-semibold'>My account</h1>
    </section>
  )
}

export default AccountBanner
