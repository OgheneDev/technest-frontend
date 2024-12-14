import React from 'react'
import Breadcrumbs from '../components/Cart Page/Breadcrumbs'
import BillingDetailsForm from '../components/Checkout Page/BillingDetailsForm'
import Order from '../components/Checkout Page/Order'
import ContactCards from '../components/About Us/ContactCards'

const CheckoutPage = () => {
  return (
    <div>
      <Breadcrumbs />
      <BillingDetailsForm />
      <Order />
      <ContactCards />
    </div>
  )
}

export default CheckoutPage
