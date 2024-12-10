import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="cart-page">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
      <ul>
        {state.items.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-4">
            <div>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Quantity: {state.totalQuantity}</h3>
      <h3>Total Price: ${state.totalPrice.toFixed(2)}</h3>
      <button onClick={handleClearCart} className="text-white bg-red-500 rounded-full py-2 px-4 mt-5">
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
