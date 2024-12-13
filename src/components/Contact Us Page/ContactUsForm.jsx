import React from 'react'
import { MessageCircleQuestion } from 'lucide-react'

const ContactUsForm = () => {
  return (
    <form className='bg-[#6610f2] p-5 rounded-[15px] w-[90%] mx-auto'>
      <div className="flex gap-5 items-center mb-10">
        <MessageCircleQuestion size={80} className='text-white' />
        <article>
        <h1 className='text-white mb-2 text-xl'>Need Any Help?</h1>
        <p className='text-white text-[12px]'>We are here to help you with any questions.</p>
      </article>
      </div>

      <div className="inputs flex flex-col gap-5 mb-5">
        <input type="text" placeholder='Name' className='px-5 py-5' />
        <input type="email" placeholder="E-mail" id="" className='px-5 py-5' />
        <input type="text" placeholder='Phone' className='px-5 py-5' />
        <input type="text" placeholder='Message' className='px-5 pb-[120px] pt-5' />
      </div>

      <button className='bg-black text-white py-2 px-8 rounded-full'>Submit</button>
    </form>
  )
}

export default ContactUsForm
