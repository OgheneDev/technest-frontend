import React from 'react'
import { useCart } from '../../context/CartContext';
import { ArrowRight } from 'lucide-react';

const Proceed = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="proceed flex flex-col gap-3 w-[90%] mx-auto bg-white border-t-4 border-2 p-5 mb-10">
        <h3>Card Totals</h3>
        <div className="flex justify-between py-2 border-b">
            <p>Subtotal</p>
            <span>${state.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-3 mb-2">
            <p>Shipping</p>
            <p>Flat rate</p>
            <p>Shipping to <span className='text-dark'>NY.</span></p>
        </div>
        <div className="inputs flex flex-col gap-3">
            <input type="text" placeholder='Country' className='border rounded-[5px] p-2 outline-none' />
            <input type="text" placeholder='State' className='border rounded-[5px] p-2 outline-none' />
            <input type="text" placeholder='Town/City' className='border rounded-[5px] p-2 outline-none' />
            <input type="text" placeholder='Zip Code' className='border rounded-[5px] p-2 outline-none' />
        </div>
        <div className='bg-bs-light uppercase px-5 py-3 w-fit text-dark font-semibold mb-4'>
            Update Totals
        </div>
        <div className="flex justify-between items-center py-3 border-t mb-6 font-semibold text-dark">
            <p>Total</p>
            <h2 className='text-2xl'>${state.totalPrice.toFixed(2)}</h2>
        </div>
        <button className='bg-dark py-4 px-7 flex items-center gap-3 text-[18px] font-semibold uppercase text-white'>
            Proceed to Checkout
            <ArrowRight size={20} />
        </button>
      </div>
  )
}

export default Proceed
