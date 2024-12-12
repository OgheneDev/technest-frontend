import React from 'react'
import { MessageCircleQuestion } from 'lucide-react'

const HelpCard = () => {
  return (
    <div className='bg-[#6610f2] p-5 rounded-[15px] flex gap-5 items-center'>
      <MessageCircleQuestion size={100} className='text-white' />
      <article>
        <h1 className='text-white mb-2 text-xl'>Need Any Help?</h1>
        <p className='text-white text-[12px]'>We are here to help you with any questions.</p>
      </article>
    </div>
  )
}

export default HelpCard
