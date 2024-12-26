import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, type) => {
    dispatch({ 
      type: type === 'increment' ? 'INCREMENT_QUANTITY' : 'DECREMENT_QUANTITY', 
      payload: { id } 
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Your cart is empty</p>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {state.items.map((item) => (
        <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
          <img
            src={item.images?.[0]}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="ml-6 flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(item.id, 'decrement')}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.id, 'increment')}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="ml-6">
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
            className="ml-6 text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;