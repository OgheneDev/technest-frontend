import React from 'react'
import { Menu, User, ShoppingBag, Search } from 'lucide-react'

import logo from '../assets/images/logo.png'


const Navbar = () => {
  return (
    <div>
     <nav className='px-[25px] py-[20px] bg-[#0d6efd] flex justify-between'>
      <div className='flex gap-[20px]'>
        <Menu size={25} className='text-white' />
        <img src={logo} alt="" className='w-[150px] ' />
      </div>

      <div className='flex gap-[20px]'>
        <User size={25} className='text-white' />
        <ShoppingBag size={25} className='text-white' />
      </div>
    </nav>

    <div className="search-container rounded-full border shadow-sm w-fit my-[20px] p-[10px] px-[20px] flex gap-[20px] mx-auto">
        <input type="text" placeholder='Search for Products..' className='w-[280px]' />
        <button>
            <Search size={23} />
        </button>
    </div>
    </div>
  )
}

export default Navbar
