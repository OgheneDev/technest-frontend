import React from 'react'
import HelpCard from './Contact Cards/HelpCard'
import ContactDetailsCard from './Contact Cards/ContactDetailsCard'

const ContactCards = () => {
  return (
    <div className='px-5 py-[30px] flex flex-col gap-7'>
      <HelpCard />
      <ContactDetailsCard />
    </div>
  )
}

export default ContactCards
