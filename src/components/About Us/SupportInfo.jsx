import React from 'react'
import { Truck, CircleDollarSign, CalendarClock, LockOpen } from 'lucide-react';

const SupportInfo = () => {
  return (
    <div className="facts flex flex-col md:px-[100px] justify-center md:flex-row md:justify-between gap-7  py-[50px]">
    {[
      { icon: Truck, text: 'Free Shipping & Returns' },
      { icon: CircleDollarSign, text: 'Money Back Guarantee' },
      { icon: CalendarClock, text: 'Online Support 24/7' },
      { icon: LockOpen, text: 'Secure Payment' },
    ].map(({ icon: Icon, text }, index) => (
      <div key={index} className="flex flex-col  items-center gap-3">
        <Icon size={45} className="text-bs-indigo" />
        <span className="text-xl font-semibold">{text}</span>
      </div>
    ))}
  </div>
  )
}

export default SupportInfo
