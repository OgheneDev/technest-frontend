import React from 'react'
import ContactUsBanner from '../components/Contact Us Page/ContactUsBanner'
import ContactUsForm from '../components/Contact Us Page/ContactUsForm'
import Shops from '../components/Contact Us Page/Shops'
import Faqs from '../components/Contact Us Page/Faqs'

const ContactUsPage = () => {
  return (
    <div>
      <ContactUsBanner />
      <div className="py-[70px] flex flex-col md:flex-row md:px-[100px] gap-6">
        <ContactUsForm />
        <Shops />
      </div>
      <Faqs />
    </div>
  )
}

export default ContactUsPage
