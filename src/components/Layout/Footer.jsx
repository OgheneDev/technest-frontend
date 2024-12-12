import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className='bg-bs-blue py-[30px] md:py-[50px] md:px-[100px] md:flex md:gap-[50px] md:justify-between md:items-start px-[20px] text-white'>
     <div>
     <div className="logo mb-[25px]">
        <img src={logo} alt="" className='w-[200px]' />
      </div>

      <div className="address mb-[30px]">
        <p className='text-[14px]'>Address: 1234 Street, Suite 500, New York, NY</p>
      </div>

      <div className="info text-[16px] flex flex-col gap-[10px]">
        <div className='flex gap-[5px]'>
          <span>Email:</span>
          <p className='font-bold'>info@technest.com</p>
        </div>

        <div className='flex gap-[5px]'>
          <span>Phone:</span>
          <p className='font-bold'>090 715 831 27</p>
        </div>
      </div>
     </div>

        <div className="lists flex justify-between md:gap-[50px] my-[30px] md:my-0">
            <div className="list flex flex-col gap-[15px]">
                <h2>Company</h2>
                <ul className='flex flex-col gap-[5px]'>
                    <li>
                      <Link to='/about-us'>
                      About Us
                      </Link>
                    </li>
                    <li>
                      <Link to='/shop'>
                      Shop 
                      </Link>
                    </li>
                    <li>Contact Us</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div className="list flex flex-col gap-[15px]">
                <h2>
                    Support
                </h2>
                <ul className='flex flex-col gap-[5px]'>
                    <li>Help & FAQs</li>
                    <li>Login / Register</li>
                    <li>Track your Order</li>
                    <li>Shipping & Returns</li>
                    <li>Acessibility</li>
                </ul>
            </div>
        </div>

        <div>
        <div className="news mb-[30px]">
            <h2 className='text-xl font-semibold mb-[20px]'>Suscribe to Our Newsletter</h2>
            <div className="sub-container flex items-center md:w-[400px] border border-white py-[10px] px-[15px] rounded-full">
                <input type="email" placeholder='Email Address..' className='bg-transparent outline-none placeholder:text-white w-[70%]' />
                <button className='bg-white text-bs-blue py-[5px] px-[15px] rounded-full'>Subscribe</button>
            </div>
        </div>

        <span className='text-[13px]'>By subscribing to our newsletter you agree to our <Link to='' className="underline">Terms of Policy</Link> and <Link className="underline">Privacy Policy</Link> </span>
        </div>

    </footer>
  )
}

export default Footer
