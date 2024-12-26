import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowRight } from 'lucide-react';

const Proceed = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    country: '',
    state: '',
    town: '',
    zipCode: ''
  });

  const shippingCost = 0;
  const totalWithShipping = state.totalPrice + shippingCost;

  useEffect(() => {
    const saved = localStorage.getItem('shippingDetails');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing shipping details:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('shippingDetails', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shippingCost.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold">${totalWithShipping.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="town"
            placeholder="Town/City"
            value={formData.town}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        Proceed to Checkout
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Proceed;