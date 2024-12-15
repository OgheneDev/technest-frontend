import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig'; // Firestore configuration
import { doc, setDoc } from 'firebase/firestore';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      setLoading(true);
      const userCredential = await signUp(email, password);
      
      // Add a null check
      if (userCredential && userCredential.user) {
        const user = userCredential.user;
  
        // Save additional details to Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          fullName,
          phoneNumber,
          address,
          email: user.email,
        });
  
        navigate('/'); // Redirect to home page
      } else {
        throw new Error('User creation failed');
      }
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-[90%] mx-auto py-[20px] flex flex-col gap-[15px]"
    >
      <h2 className="text-2xl font-semibold">Register</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="fullName" className="text-[13px] text-gray-500">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="email" className="text-[13px] text-gray-500">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="phoneNumber" className="text-[13px] text-gray-500">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="address" className="text-[13px] text-gray-500">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="password" className="text-[13px] text-gray-500">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="confirmPassword" className="text-[13px] text-gray-500">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border rounded-sm pl-[10px] py-[15px]"
        />
      </div>

      <button 
        type="submit" 
        className="bg-black text-white py-[15px] uppercase font-semibold"
      >
        {loading ? (
          <span className="spinner border-white border-[3px] border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
