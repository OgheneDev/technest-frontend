import React from 'react'
import Breadcrumbs from '../components/Cart Page/Breadcrumbs'
import  CartItems from '../components/Cart Page/CartItems'
import Proceed from '../components/Cart Page/Proceed'

const CartPage = () => {
  return (
    <div>
      <Breadcrumbs />
      <div className='md:flex md:items-start md:px-[100px] gap-[450px] md:py-[50px] md:justify-between'>
      <CartItems />
      <Proceed />
      </div>
    </div>
  )
}

export default CartPage

