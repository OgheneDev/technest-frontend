import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password);
      navigate('/'); // Redirect to home page after successful registration
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
      className='w-[90%] mx-auto py-[20px] flex flex-col gap-[15px]'
    >
      <h2 className='text-2xl font-semibold'>Register</h2>
      
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          {error}
        </div>
      )}

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="email" className='text-[13px] text-gray-500'>
          Email address
        </label>
        <input 
          type="email" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border rounded-sm pl-[10px] py-[15px]'  
        />
      </div>
      
      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="password" className='text-[13px] text-gray-500'>
          Password
        </label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border rounded-sm pl-[10px] py-[15px]'  
        />
      </div>

      <div className="form-group flex flex-col gap-[5px]">
        <label htmlFor="confirm-password" className='text-[13px] text-gray-500'>
          Confirm Password
        </label>
        <input 
          type="password" 
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='border rounded-sm pl-[10px] py-[15px]'  
        />
      </div>
      
      <button 
        type='submit' 
        className='bg-black text-white py-[15px] uppercase font-semibold'
      >
        {loading ? (
          <span className="spinner border-white border-[3px] border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
}

export default SignUpForm;