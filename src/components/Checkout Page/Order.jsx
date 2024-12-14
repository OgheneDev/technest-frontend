import React from 'react'
import { useCart } from '../../context/CartContext'
import { X } from 'lucide-react';
import placeholderImg from '../../assets/images/shop50-product-14-4-600x600.jpg';

const Order = () => {
    const { state, dispatch } = useCart();

    const handleRemoveItem = (id) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };
    
    const handleIncrementQuantity = (id) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
    };
    
    const handleDecrementQuantity = (id) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } });
    };

    const shippingCost = 0; // Flat rate shipping cost (adjust as needed)

    const totalWithShipping = state.totalPrice + shippingCost;


  return (
    <div className='md:w-[65%] w-[90%] mx-auto mb-[50px] bg-white border-2 md:px-[40px] text-dark px-5 py-7'>
      <h2 className='uppercase text-dark text-xl mb-5 font-bold md:text-[18px]'>Your order</h2>
      <div className="product">
        <h3 className='uppercase font-bold text-[18px] md:text-[16px] md:font-semibold text-dark mb-5'>Product</h3>
        <div className="flex flex-col gap-5">
            {state.items.map((item) => (
                <div
                 key={item.id}
                 className='flex items-start gap-5 text-dark mb-[40px]'
                >
                 <div className="image">
                    <img
                     src={item.images && item.images.length > 0 ? item.images[0] : placeholderImg}
                     className='w-[120px] h-[120px] md:w-[80px] md:h-[80px]'
                     alt={item.name || 'Product image'} 
                    />
                 </div>
                <div className="info">
                    <p className='break-words font-semibold md:font-normal mb-2'>{item.name}</p>
                   <div className='md:flex md:justify-between md:items-center'>
                   <div className="quantity mb-2 flex items-center">
                   <button
                    className="p-2 border"
                    onClick={() => handleDecrementQuantity(item.id)}
                   >
                    -
                   </button>
                   <span className="p-2 font-semibold border">{item.quantity}</span>
                   <button
                    className="p-2 border"
                    onClick={() => handleIncrementQuantity(item.id)}
                   >
                     +
                   </button>
                </div>
                  <p className='font-bold text-[18px] md:font-semibold'>${item.price.toFixed(2)}</p>
                </div>  
                <button
                 onClick={() => handleRemoveItem(item.id)}
                 className='bg-white absolute right-[120px] flex justify-center shadow-lg rounded-full p-2'>
                  <X size={15} />
                </button>
            </div>
            </div>
            ))}
            <div className="flex justify-between py-2 border-b text-dark">
              <p className='font-semibold'>Subtotal</p>
              <span className='font-bold text-[18px]'>${state.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3 border-b py-3">
                <p className='font-semibold'>Shipping</p>
                <p className='text-grey'>Flat Rate</p>
            </div>
            <div className="flex justify-between items-center py-3  mb-6 font-semibold text-dark">
            <p>Total</p>
            <h2 className='text-2xl'>${totalWithShipping.toFixed(2)}</h2>
          </div>
            <div className="payment-methods">
                <h3 className='font-bold text-[16px] mb-5'>Payment methods</h3>
                <div className="options flex flex-col gap-5">
                    <div className="option flex gap-2">
                        <input type="radio" className='w-[50px]' name="" id="" />
                        <label className='text-grey' htmlFor="">Direct bank transfer</label>
                    </div>
                    <div className="option flex gap-2">
                        <input type="radio" className='w-[50px]' name="" id="" />
                        <label className='text-grey' htmlFor="">Cheque payments</label>
                    </div>
                    <div className="option flex gap-2">
                        <input type="radio" className='w-[50px]' name="" id="" />
                        <label className='text-grey' htmlFor="">Cash on delivery</label>
                    </div>
                </div>
            </div>
            <button className='bg-black text-white py-3 uppercase font-semibold'>
                Place order
            </button>
        </div>
      </div>
    </div>
  )
}

export default Order
