import React, {useState} from 'react'
import { Menu, User, ShoppingBag, Search, X } from 'lucide-react'
import logo from '../assets/images/logo.png'
import { useLocation, Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
     <nav className='px-[25px] py-[20px] md:px-[100px] bg-[#0d6efd] flex justify-between'>
      <div className='flex gap-[20px] items-start'>
        <button 
         onClick={() => setIsMenuOpen(true)}
        >
        <Menu size={25} className='text-white md:hidden' />
        </button>
        <Link to='/'>
          <img src={logo} alt="" className='w-[150px] md:w-[200px]' />
        </Link>
      </div>

      <div className='flex gap-[20px]'>
        <Link to='/account'>
          <User size={25} className='text-white' />
        </Link>
        <ShoppingBag size={25} className='text-white' />
      </div>
    </nav>

    <div className="search-container md:hidden rounded-full border shadow-sm w-fit my-[20px] p-[10px] px-[20px] flex gap-[20px] mx-auto">
        <input type="text" placeholder='Search for Products..' className='w-[280px] outline-none' />
        <button>
            <Search size={23} />
        </button>
    </div>

    {/* Mobile Sliding Menu */}
    <div
     className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transform ${
      isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out `}
    >
        <div>
        <button onClick={() => setIsMenuOpen(false)}>
            <X size={25} className="text-white" />
          </button>
        </div>

        <nav className='p-4'>
          <ul className='space-y-5'>
            <li>Cases</li>
            <li>Screen Protectors</li>
            <li>MagSafe</li>
            <li>Cables</li>
            <li>Chargers</li>
            <li>Power Banks</li>
            <li>Headphones</li>
            <li>More</li>
          </ul>
        </nav>
    </div>


    {/* Backdrop for Mobile Menu */}
    {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default Navbar
