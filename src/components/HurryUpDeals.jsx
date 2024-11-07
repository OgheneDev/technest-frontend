import React from 'react'

const HurryUpDeals = () => {
  return (
    <section className='mb-[50px]'>
      <h3 className='font-bold text-grey-dark text-xl mb-[20px] pl-[20px]'>Hurry Up Deals</h3>

      <div className="deals flex flex-col gap-[20px]">
        <div className="bg-[url('https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-bg-1_xelc76.jpg')] rounded-[15px] w-[90%] flex justify-between p-[25px] mx-auto text-white">
            <div className="text-content flex flex-col gap-[20px]">
            <h3 className='text-2xl font-bold '>Airpods <br /> Experience</h3>
            <button className='bg-white text-bs-indigo rounded-full py-[5px] px-[20px]'>Shop Now</button>
            </div>

            <div className="image-container">
                <img src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-1_t09pru.png" alt="" className='w-[100px]' />
            </div>
        </div>

        <div className="bg-bs-light w-[90%] flex justify-between p-[25px] mx-auto text-grey-dark rounded-[15px]">
        <div className="text-content flex flex-col gap-[20px]">
            <h3 className='text-2xl font-bold'>New 3 in 1 <br/> wireless charger</h3>
            <button className='bg-white text-bs-indigo rounded-full py-[5px] w-fit px-[25px]'>Shop Now</button>
            </div>

            <div className="image-container">
                <img src="https://res.cloudinary.com/dgc8cd67w/image/upload/v1731011856/shop50-banner-img-2_z6asph.png" alt="" className='w-[150px]' />
            </div>
        </div>


      </div>
    </section>
  )
}

export default HurryUpDeals
