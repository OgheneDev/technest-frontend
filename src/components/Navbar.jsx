import React from 'react'
import { Menu, User, ShoppingBag, Search } from 'lucide-react'
import logo from '../assets/images/logo.png'


const Navbar = () => {
  return (
    <div>
     <nav className='px-[25px] py-[20px] md:px-[100px] bg-[#0d6efd] flex justify-between'>
      <div className='flex gap-[20px] items-start'>
        <Menu size={25} className='text-white md:hidden' />
        <img src={logo} alt="" className='w-[150px] md:w-[200px]' />
      </div>

      <div className='flex gap-[20px]'>
        <User size={25} className='text-white' />
        <ShoppingBag size={25} className='text-white' />
      </div>
    </nav>

    <div className="search-container md:hidden rounded-full border shadow-sm w-fit my-[20px] p-[10px] px-[20px] flex gap-[20px] mx-auto">
        <input type="text" placeholder='Search for Products..' className='w-[280px] outline-none' />
        <button>
            <Search size={23} />
        </button>
    </div>
    </div>
  )
}

export default Navbar
