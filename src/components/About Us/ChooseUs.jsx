import React from 'react'

const ChooseUs = () => {
  return (
    <div className='py-[50px] px-[20px] md:px-[100px]'>
      <article className='mb-[50px]'>
        <h1 className='mb-5 font-bold text-xl md:text-2xl text-dark'>Why Choose US?</h1>
        <p className='text-grey md:text-[20px]'>At Porto, we pride ourselves on exceptional customer service, competitive prices, and a seamless shopping experience. Our products are carefully selected for their quality and performance, ensuring you receive only the best. Plus, with fast shipping and hassle-free returns, you can shop with confidence.</p>
      </article>
      <div className='bg-[#6610f2] md:flex  md:justify-between md:items-center text-white p-5 md:py-[60px] md:px-[40px] md:text-start text-center rounded-[15px]'>
        <p className='text-[16px] md:break-words md:w-[60%] md:text-3xl font-semibold mb-5'>Join our team at Porto! Discover exciting career opportunities in the world of smartphone accessories.</p>
        <button className='bg-black text-white px-5 py-1 md:py-3 md:px-12 rounded-full'>Join now</button>
      </div>
    </div>
  )
}

export default ChooseUs
