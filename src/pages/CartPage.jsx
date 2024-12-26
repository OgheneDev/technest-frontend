import React from 'react'
import Breadcrumbs from '../components/Cart Page/Breadcrumbs'
import CartItems from '../components/Cart Page/CartItems'
import Proceed from '../components/Cart Page/Proceed'

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <Proceed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage