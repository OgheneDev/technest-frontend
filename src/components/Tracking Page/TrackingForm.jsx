import React from 'react'

const TrackingForm = () => {
  return (
    <div className='text-grey pb-[40px] px-5'>
      <p className='mb-5 text-[13px]'>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
      <form action="" className='flex flex-col gap-5'>
        <div className="form-group flex flex-col gap-1 text-[13px]">
            <label htmlFor="">Order ID</label>
            <input type="text" className='border p-2 py-3 w-full placeholder:text-[13px]' placeholder='Found in your order code confirmation email.' />
        </div>

        <div className="form-group flex flex-col gap-1 text-[13px]">
            <label htmlFor="">Billing email</label>
            <input type="email" className='border p-2 py-3 placeholder:text-[13px]' placeholder='Email you used during checkout.' />
        </div>

        <button className='bg-black text-white py-3 px-10 w-fit font-bold uppercase'>Order Track</button>
      </form>
    </div>
  )
}

export default TrackingForm
