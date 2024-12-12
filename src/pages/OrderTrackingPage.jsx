import React from 'react'
import Breadcrumbs from '../components/Tracking Page/Breadcrumbs'
import TrackingForm from '../components/Tracking Page/TrackingForm'
import ContactCards from '../components/About Us/ContactCards'

const OrderTrackingPage = () => {
  return (
    <div className='p-5'>
      <Breadcrumbs />
      <TrackingForm />
      <ContactCards />
    </div>
  )
}

export default OrderTrackingPage
