import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BillingDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});

  // Load saved billing details on component mount
  useEffect(() => {
    const savedBillingDetails = localStorage.getItem('billingDetails');
    if (savedBillingDetails) {
      try {
        const parsedDetails = JSON.parse(savedBillingDetails);
        setFormData(parsedDetails);
      } catch (error) {
        console.error('Error parsing Billing details:', error);
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
    
    // Save billing details to local storage whenever form changes
    localStorage.setItem('billingDetails', JSON.stringify(updatedFormData));
  };


  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch(name) {
      case 'firstName':
      case 'lastName':
        errorMessage = value.trim().length < 2 
          ? 'Name must be at least 2 characters long' 
          : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = !emailRegex.test(value) 
          ? 'Please enter a valid email address' 
          : '';
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        errorMessage = !phoneRegex.test(value) 
          ? 'Please enter a valid phone number' 
          : '';
        break;
      case 'zipCode':
        errorMessage = !/^\d{5}(-\d{4})?$/.test(value) 
          ? 'Please enter a valid zip code' 
          : '';
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const allFields = Object.keys(formData);
    const newErrors = {};
    
    allFields.forEach(field => {
      validateField(field, formData[field]);
      if (formData[field].trim() === '' && field !== 'companyName' && field !== 'orderNotes') {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      // Save final details to local storage
      localStorage.setItem('billingDetails', JSON.stringify(formData));
      
      // Optionally, navigate to next step or show confirmation
      navigate('/checkout'); // Adjust route as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className='px-[20px] py-[30px] md:py-0 md:w-full'>
      <h2 className='text-xl font-bold mb-5 text-dark'>Billing Details</h2>
      
      {/* First Name */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="firstName" className='text-grey text-[14px] font-semibold'>
          First Name {errors.firstName && <span className='text-red-500 ml-2'>*{errors.firstName}</span>}
        </label>
        <input 
          type="text" 
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.firstName ? 'border-red-500' : ''}`}
          placeholder="Enter your first name"
        />
      </div>

      {/* Last Name */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="lastName" className='text-grey text-[14px] font-semibold'>
          Last Name {errors.lastName && <span className='text-red-500 ml-2'>*{errors.lastName}</span>}
        </label>
        <input 
          type="text" 
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.lastName ? 'border-red-500' : ''}`}
          placeholder="Enter your last name"
        />
      </div>

      {/* Company Name (Optional) */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="companyName" className='text-grey text-[14px] font-semibold'>
          Company name (optional)
        </label>
        <input 
          type="text" 
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className='px-5 py-3 border'
          placeholder="Your company name"
        />
      </div>

      {/* Country */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="country" className='text-grey text-[14px] font-semibold'>
          Country/region {errors.country && <span className='text-red-500 ml-2'>*{errors.country}</span>}
        </label>
        <input 
          type="text" 
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.country ? 'border-red-500' : ''}`}
          placeholder="Enter your country"
        />
      </div>

      {/* Street Address */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="streetAddress" className='text-grey text-[14px] font-semibold'>
          Street address {errors.streetAddress && <span className='text-red-500 ml-2'>*{errors.streetAddress}</span>}
        </label>
        <input 
          type="text" 
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className={`px-5 py-3 border placeholder:text-[12px] ${errors.streetAddress ? 'border-red-500' : ''}`}
          placeholder="House number and street name"
        />
      </div>

      {/* City */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="city" className='text-grey text-[14px] font-semibold'>
          Town/City {errors.city && <span className='text-red-500 ml-2'>*{errors.city}</span>}
        </label>
        <input 
          type="text" 
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.city ? 'border-red-500' : ''}`}
          placeholder="Enter your city"
        />
      </div>

      {/* State */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="state" className='text-grey text-[14px] font-semibold'>
          State {errors.state && <span className='text-red-500 ml-2'>*{errors.state}</span>}
        </label>
        <input 
          type="text" 
          name="state"
          value={formData.state}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.state ? 'border-red-500' : ''}`}
          placeholder="Enter your state"
        />
      </div>

      {/* Zip Code */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="zipCode" className='text-grey text-[14px] font-semibold'>
          Zip Code {errors.zipCode && <span className='text-red-500 ml-2'>*{errors.zipCode}</span>}
        </label>
        <input 
          type="text" 
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.zipCode ? 'border-red-500' : ''}`}
          placeholder="Enter your zip code"
        />
      </div>

      {/* Phone */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="phone" className='text-grey text-[14px] font-semibold'>
          Phone {errors.phone && <span className='text-red-500 ml-2'>*{errors.phone}</span>}
        </label>
        <input 
          type="tel" 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="Enter your phone number"
        />
      </div>

      {/* Email */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="email" className='text-grey text-[14px] font-semibold'>
          Email address {errors.email && <span className='text-red-500 ml-2'>*{errors.email}</span>}
        </label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`px-5 py-3 border ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Enter your email address"
        />
      </div>

      {/* Order Notes */}
      <div className="form-group flex flex-col gap-1 mb-5">
        <label htmlFor="orderNotes" className='text-grey text-[14px] font-semibold'>
          Order notes (optional)
        </label>
        <textarea 
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleChange}
          className='placeholder:text-[12px] border px-5 pt-2 pb-[100px]' 
          placeholder='Notes about your order, e.g special notes for delivery.'
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        className='bg-dark text-white px-6 py-3 uppercase font-semibold w-full hover:bg-opacity-90 transition'
      >
        Continue to Payment
      </button>
    </form>
  )
}

export default BillingDetailsForm