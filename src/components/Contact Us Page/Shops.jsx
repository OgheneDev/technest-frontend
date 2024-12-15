import React from 'react'
import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Shops = () => {
    const stores = [
        {
            number: 1,
            name: 'Los Angeles Store',
            address: '123 TechNest Hill St, Los Angeles, CA 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support1@technest.com'
        },
        {
            number: 2,
            name: 'New York Store',
            address: '123 TechNest Hill St, New York, NY 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support2@technest.com'
        },
        {
            number: 3,
            name: 'Detroit Store',
            address: '123 TechNest Hill St, Detroit, MI 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support3@technest.com'
        }
    ]

  return (
    <div className='border border-grey rounded-[15px] w-[90%] mx-auto p-7 md:px-[40px]'>
      <div className="flex gap-2 mb-5 md:mb-7 items-center">
         <Phone size={30} />
         <h3 className='text-2xl md:text-3xl text-dark font-bold'>123 456 7890</h3>
        </div>
        <p className='text-grey mb-2 md:text-[18px]'>Monday to Saturday - 8am - 6pm</p>
        <Link className='text-[#6610f2] underline md:tect-[18px]'>Frequently asked Questions</Link>

        <div className="stores flex flex-col gap-5 mt-8">
            {stores.map((store, index) => (
                <div
                 key={index}
                >
                    <span className='text-grey uppercase text-[12px]'>Store {store.number}</span>
                    <h3 className='font-bold text-xl mb-3'>{store.name}</h3>
                    <p className='text-grey text-[14px] md:text-[16px] mb-2'>{store.address}</p>
                    <p className='text-grey text-[14px] mb-5 md:text-[16px]'>{store.phoneNumber}</p>
                    <p className='font-semibold text-[15px] underline text-dark'>{store.email}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Shops
