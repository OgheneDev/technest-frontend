import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

const ProductInfo = ({ id, name, category, price, description, rating, images }) => {
  // Render stars for ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  const { state, dispatch } = useCart();

  // Find the current item in the cart
  const cartItem = state.items.find(item => item.id === id);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id, 
        name, 
        price, 
        quantity: 1, 
        images
      }
    });
  };

  const handleIncrementQuantity = () => {
    dispatch({ 
      type: 'INCREMENT_QUANTITY', 
      payload: { id } 
    });
  };

  const handleDecrementQuantity = () => {
    dispatch({ 
      type: 'DECREMENT_QUANTITY', 
      payload: { id } 
    });
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-1'>{name}</h1>
      <div className="flex gap-1 mb-4">
        {renderStars(rating || 4)}
      </div>
      
      <h2 className='font-semibold text-2xl mb-5'>${price.toFixed(2)}</h2>
      <p className='text-grey mb-2'>{description}</p>
      <p className='font-semibold text-[13px] mb-5'>
        Category: <span className='text-grey font-normal'>{category}</span>
      </p>
      
      <div className="flex gap-3">
        <div className="quantity flex justify-center items-center gap-2">
          <button
            className="p-3 border"
            onClick={handleDecrementQuantity}
            disabled={!cartItem || cartItem.quantity <= 1}
          >
            -
          </button>
          <span className="p-3 font-semibold border">
            {cartItem ? cartItem.quantity : 0}
          </span>
          <button
            className="p-3 border"
            onClick={handleIncrementQuantity}
            disabled={!cartItem}
          >
            +
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="bg-black text-white hover:bg-gray-800 transition-colors flex gap-3 justify-center px-5 py-3 uppercase font-bold"
        >
          <ShoppingBag size={25} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;