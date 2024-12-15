import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';
import Breadcrumbs from '../components/Cart Page/Breadcrumbs';

const OrderComplete = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const generateOrderNumber = () => {
      return Math.floor(10000 + Math.random() * 90000);
    };
  
    const billingDetails = JSON.parse(localStorage.getItem('billingDetails') || '{}');
    const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails') || '{}');
    const paymentMethod = localStorage.getItem('paymentMethod') || 'Not Selected';
  
    // Store current cart items before clearing
    const currentCartItems = state.items;
    const currentTotalPrice = state.totalPrice;
  
    const orderInfo = {
      orderNumber: generateOrderNumber(),
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      total: currentTotalPrice,
      billingDetails,
      shippingDetails,
      paymentMethod,
      items: currentCartItems,
    };
  
    setOrderDetails(orderInfo);
  
    // Clear cart after setting order details
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  if (!orderDetails) return (
    <div className="flex items-center justify-center w-full h-[700px]">
      <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-bs-indigo"></div>
    </div>
  );

  return (
    <div>
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <Check size={48} className="text-green-500 mr-4" />
          <h1 className="text-3xl font-bold text-dark">Thank You for Your Order!</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Order Number:</strong> #{orderDetails.orderNumber}</p>
              <p><strong>Date:</strong> {orderDetails.date}</p>
              <p><strong>Status:</strong> {orderDetails.status}</p>
              <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
            </div>
            <div className="text-right">
              <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          {orderDetails.items.map(item => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Billing Address</h3>
            <p>{orderDetails.billingDetails.firstName} {orderDetails.billingDetails.lastName}</p>
            <p>{orderDetails.billingDetails.streetAddress}</p>
            <p>{orderDetails.billingDetails.city}, {orderDetails.billingDetails.state}</p>
            <p>{orderDetails.billingDetails.country} {orderDetails.billingDetails.zipCode}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{orderDetails.shippingDetails.firstName || 'N/A'} {orderDetails.shippingDetails.lastName || ''}</p>
            <p>{orderDetails.shippingDetails.streetAddress || 'N/A'}</p>
            <p>{orderDetails.shippingDetails.town || 'N/A'}, {orderDetails.shippingDetails.state || 'N/A'}</p>
            <p>{orderDetails.shippingDetails.country || 'N/A'} {orderDetails.shippingDetails.zipCode || 'N/A'}</p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/shop')} 
            className="bg-dark text-white px-6 py-3 rounded hover:bg-opacity-90 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderComplete;
