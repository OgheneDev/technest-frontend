import React from 'react'
import Breadcrumbs from '../components/Cart Page/Breadcrumbs'
import  CartItems from '../components/Cart Page/CartItems'
import Proceed from '../components/Cart Page/Proceed'

const CartPage = () => {
  return (
    <>
      <Breadcrumbs />
      <CartItems />
      <Proceed />
    </>
  )
}

export default CartPage

