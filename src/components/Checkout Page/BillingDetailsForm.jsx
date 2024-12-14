import React from 'react'

const BillingDetailsForm = () => {
  return (
    <form className='px-[20px] py-[30px]'>
      <h2 className='text-xl font-bold mb-5 text-dark'>Billing Details</h2>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>First Name</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Last Name</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Company name (optional)</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Country/region</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Street address</label>
        <input type="text" className='px-5 py-3 border placeholder:text-[12px]' placeholder='House number and street name' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Town/City</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>State</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Zip Code</label>
        <input type="text" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Phone</label>
        <input type="tel" className='px-5 py-3 border' />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Email address</label>
        <input type="email" className='px-5 py-3 border' name="" id="" />
      </div>
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="" className='text-grey text-[14px] font-semibold'>Order notes (optional)</label>
        <input type="text" className='placeholder:text-[12px] border px-5 pt-2 pb-[100px]' placeholder='Notes about your order, e.g special notes for delivery.' />
      </div>
    </form>
  )
}

export default BillingDetailsForm
