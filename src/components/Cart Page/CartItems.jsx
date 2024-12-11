import React from 'react';
import { useCart } from '../../context/CartContext';
import { X } from 'lucide-react';
import placeholderImg from '../../assets/images/shop50-product-14-4-600x600.jpg';

const CartItems = () => {
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

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="cart-page py-5">
      <div className="flex flex-col">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 w-[90%] mx-auto bg-white border-t-4 border-2 border-t-blue-800 text-center p-5"
          >
            <div className="relative">
              <img
                src={item.images && item.images.length > 0 ? item.images[0] : placeholderImg}
                alt={item.name || 'Product image'}
                className="w-[80px] h-[80px] mx-auto"
              />
              <button
                className="bg-white absolute top-0 right-[90px] flex justify-center shadow-lg rounded-full p-2"
                onClick={() => handleRemoveItem(item.id)}
              >
                <X size={15} />
              </button>
            </div>
            <p>{item.name}</p>
            <span className="text-[13px] text-[#999999]">${item.price.toFixed(2)}</span>
            <div className="quantity flex justify-center items-center gap-2">
              <button
                className="p-3 border"
                onClick={() => handleDecrementQuantity(item.id)}
              >
                -
              </button>
              <span className="p-3 font-semibold border">{item.quantity}</span>
              <button
                className="p-3 border"
                onClick={() => handleIncrementQuantity(item.id)}
              >
                +
              </button>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
