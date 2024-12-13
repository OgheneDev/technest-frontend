import React from 'react'
import ContactUsBanner from '../components/Contact Us Page/ContactUsBanner'
import ContactUsForm from '../components/Contact Us Page/ContactUsForm'
import Shops from '../components/Contact Us Page/Shops'

const ContactUsPage = () => {
  return (
    <div>
      <ContactUsBanner />
      <div className="py-[70px] flex flex-col gap-6">
        <ContactUsForm />
        <Shops />
      </div>
    </div>
  )
}

export default ContactUsPage
