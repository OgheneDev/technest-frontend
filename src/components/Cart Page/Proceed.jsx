import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowRight } from 'lucide-react';

const Proceed = () => {
  const { state } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    country: '',
    state: '',
    town: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const shippingCost = 0; // Flat rate shipping cost (adjust as needed)

  const totalWithShipping = state.totalPrice + shippingCost;

  // Load saved shipping details on component mount
  useEffect(() => {
    const savedShippingDetails = localStorage.getItem('shippingDetails');
    if (savedShippingDetails) {
      try {
        const parsedDetails = JSON.parse(savedShippingDetails);
        setFormData(parsedDetails);
      } catch (error) {
        console.error('Error parsing Shipping details:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };

    setFormData(updatedFormData);

    // Validate field as it changes
    validateField(name, value);

    // Save shipping details to local storage whenever form changes
    localStorage.setItem('shippingDetails', JSON.stringify(updatedFormData));
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'zipCode':
        errorMessage = !/^\d{5}(-\d{4})?$/.test(value)
          ? 'Please enter a valid zip code'
          : '';
        break;
      case 'country':
      case 'state':
      case 'town':
        errorMessage = value.trim() === '' ? 'This field is required' : '';
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const allFields = Object.keys(formData);
    const newErrors = {};

    allFields.forEach((field) => {
      const value = formData[field];
      validateField(field, value);
      if (!value.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (!hasErrors) {
      // Save final details to local storage
      localStorage.setItem('shippingDetails', JSON.stringify(formData));

      // Optionally, navigate to next step or show confirmation
      navigate('/checkout'); // Adjust route as needed
    }
  };

  return (
    <div className="proceed md:w-[350px] flex flex-col gap-3 w-[90%] mx-auto bg-white border-t-4 border-2 p-5  mb-10">
      {state.items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <h3>Cart Totals</h3>
          <div className="flex justify-between py-2 border-b">
            <p>Subtotal</p>
            <span>${state.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-3 mb-2">
            <p>Shipping</p>
            <p>Flat rate: ${shippingCost.toFixed(2)}</p>
            <p>Shipping to <span className="text-dark"></span></p>
          </div>
          <div className="inputs flex flex-col gap-3">
            <input
             type="text"
             name='firstName'
             placeholder='First name'
             value={formData.firstName}
             onChange={handleChange}
             className={`border rounded-[5px] p-2 outline-none ${errors.country ? 'border-red-500' : ''}`}
             />
            <input
             type="text"
             name='lastName'
             placeholder='Last Name'
             value={formData.lastName}
             onChange={handleChange}
             className={`border rounded-[5px] p-2 outline-none ${errors.country ? 'border-red-500' : ''}`}
            />
            <input
             type="text"
             name='streetAddress'
             placeholder='Street Address'
             value={formData.streetAddress}
             onChange={handleChange}
             className={`border rounded-[5px] p-2 outline-none ${errors.country ? 'border-red-500' : ''}`}
             />
            <input
              type="text"
              name="country" // Add name attribute
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={`border rounded-[5px] p-2 outline-none ${errors.country ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="state" // Add name attribute
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={`border rounded-[5px] p-2 outline-none ${errors.state ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="town" // Add name attribute
              placeholder="Town/City"
              value={formData.town}
              onChange={handleChange}
              className={`border rounded-[5px] p-2 outline-none ${errors.town ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="zipCode" // Add name attribute
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className={`border rounded-[5px] p-2 outline-none ${errors.zipCode ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="bg-bs-light uppercase px-5 py-3 w-fit text-dark font-semibold mb-4">
            Update Totals
          </div>
          <div className="flex justify-between items-center py-3 border-t mb-6 font-semibold text-dark">
            <p>Total</p>
            <h2 className="text-2xl">${totalWithShipping.toFixed(2)}</h2>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-dark py-4 px-6 flex items-center gap-3 md:justify-between text-[16px] font-semibold uppercase text-white"
          >
            Proceed to Checkout
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Proceed;
