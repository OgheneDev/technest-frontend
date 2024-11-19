import React from 'react'
import { Link } from 'react-router-dom'

const SignInForm = () => {
  return (
    <form className='w-[90%] mx-auto py-[20px] flex flex-col gap-[15px]'>
      <h2 className='text-2xl font-semibold'>Login</h2>
      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="" className='text-[13px] text-gray-500'>Email address</label>
        <input type="email" className='border rounded-sm pl-[10px] py-[15px]'  />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="" className='text-[13px] text-gray-500'>Password</label>
        <input type="password" name="" id="" className='border rounded-sm pl-[10px] py-[15px]'  />
      </div>

      <div className="form-group flex flex-row gap-[5px] items-center">
        <input type="checkbox" name="" id="" /> 
        <label htmlFor="" className='text-[13px] text-gray-500'>Remember me</label>
      </div>

      <Link to='/password-reset' className='text-[14px] font-semibold'>
        Forgot password?
      </Link>

      <button type='submit' className='bg-black text-white py-[15px] uppercase font-semibold'>
        Login
      </button>

    </form>
  )
}

export default SignInForm
