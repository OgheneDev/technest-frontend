import React from 'react'

const SignUpForm = () => {
  return (
    <form className='w-[90%] mx-auto py-[20px] flex flex-col gap-[15px]'>
      <h2 className='text-2xl font-semibold'>Register</h2>
      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="" className='text-[13px] text-gray-500'>Email address</label>
        <input type="email" className='border rounded-sm pl-[10px] py-[15px]'  />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="" className='text-[13px] text-gray-500'>Password</label>
        <input type="password" name="" id="" className='border rounded-sm pl-[10px] py-[15px]'  />
      </div>

      <button type='submit' className='bg-black text-white py-[15px] uppercase font-semibold'>
        Register
      </button>
    </form>
  )
}

export default SignUpForm
