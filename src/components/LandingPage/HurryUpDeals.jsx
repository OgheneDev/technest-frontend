import React from 'react'
import { Link } from 'react-router-dom'

const HurryUpDeals = () => {
  return (
    <section className='mb-[50px]'>
      <h3 className='font-bold text-grey-dark text-xl md:text-3xl mb-[20px] pl-[20px] md:pl-[100px]'>Hurry Up Deals</h3>

      <div className="deals flex flex-col md:flex-row  md:px-[100px] gap-[20px]">
        <div className="bg-[url('https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-bg-1_xelc76.jpg')] md:items-center rounded-[15px] w-[90%] flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto text-white">
            <div className="text-content flex md:items-start flex-col gap-[20px]">
            <h3 className='text-2xl md:text-4xl font-bold '>Airpods <br /> Experience</h3>
            <Link to='/shop'>
            <button className='bg-white text-bs-indigo rounded-full py-[5px] px-[20px]'>
              Shop Now
            </button>
            </Link>
            </div>

            <div className="image-container">
                <img src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-1_t09pru.png" alt="" className='w-[100px] md:w-[170px]' />
            </div>
        </div>

        <div className="bg-bs-light w-[90%] flex justify-between p-[25px] md:py-[50px] md:px-[35px] mx-auto items-center text-grey-dark rounded-[15px]">
        <div className="text-content md:w-[50%] flex flex-col md:items-start gap-[20px]">
            <h3 className='text-2xl md:text-4xl font-bold'>New 3 in 1 <br/> wireless charger</h3>
            <p className='text-[#777] hidden md:block'>Save up to 50% off on new arrivals</p>
             <Link to='/shop'>
             <button className='bg-white text-bs-indigo rounded-full py-[5px] w-fit px-[25px]'>
              Shop Now
            </button>
             </Link>
            </div>

            <div className="image-container">
                <img src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-2_z6asph.png" alt="" className='w-[150px] md:w-[240px]' />
            </div>
        </div>


      </div>
    </section>
  )
}

export default HurryUpDeals
