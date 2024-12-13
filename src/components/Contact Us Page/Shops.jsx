import React from 'react'
import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Shops = () => {
    const stores = [
        {
            number: 1,
            name: 'Los Angeles Store',
            address: '123 Porto Hill St, Los Angeles, CA 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support1@technest.com'
        },
        {
            number: 2,
            name: 'New York Store',
            address: '123 Porto Hill St, New York, NY 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support2@technest.com'
        },
        {
            number: 3,
            name: 'Detroit Store',
            address: '123 Porto Hill St, Detroit, MI 90000',
            phoneNumber: '1-888-123-1456',
            email: 'support3@technest.com'
        }
    ]

  return (
    <div className='border border-grey-dark rounded-[15px] w-[90%] mx-auto p-7'>
      <div className="flex gap-2 mb-5 items-center">
         <Phone size={20} />
         <h3 className='text-xl text-dark font-bold'>123 456 7890</h3>
        </div>
        <p className='text-grey mb-2'>Monday to Saturday - 8am - 6pm</p>
        <Link className='text-[#6610f2] underline '>Frequently asked Questions</Link>

        <div className="stores flex flex-col gap-5 mt-8">
            {stores.map((store, index) => (
                <div
                 key={index}
                >
                    <span className='text-grey uppercase'>Store {store.number}</span>
                    <h3 className='font-bold text-2xl mb-3'>{store.name}</h3>
                    <p className='text-grey text-[17px]'>{store.address}</p>
                    <p className='text-grey text-[17px] mb-5'>{store.phoneNumber}</p>
                    <p className='font-semibold text-[18px] underline text-dark'>{store.email}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Shops