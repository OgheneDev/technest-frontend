import React from 'react'
import { Phone } from 'lucide-react'

const Header = () => {
  return (
    <header className='flex justify-between py-[10px] px-[25px] text-[#222529] font-bold text-[13px] boder border-b'>
      <div className="number flex items-center gap-[5px]">
        <Phone size={15} />
        <span>08071920976</span>
      </div>

      
    </header>
  )
}

export default Header
