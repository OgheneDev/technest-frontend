import React from 'react'
import HelpCard from './Contact Cards/HelpCard'
import ContactDetailsCard from './Contact Cards/ContactDetailsCard'

const ContactCards = () => {
  return (
    <div className='px-5 md:px-[100px] py-[30px] md:py-[50px] flex flex-col md:flex-row md:justify-center gap-7'>
      <HelpCard />
      <ContactDetailsCard />
    </div>
  )
}

export default ContactCards
