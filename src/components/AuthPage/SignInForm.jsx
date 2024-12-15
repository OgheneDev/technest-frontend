import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await signIn(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
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
      <h2 className='text-2xl font-semibold'>Login</h2>
      
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
      
      <div className="flex items-center justify-between">
        <div className="form-group flex flex-row gap-[5px] items-center">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember" className='text-[13px] text-gray-500'>
            Remember me
          </label>
        </div>
        
        <Link to='/password-reset' className='text-[14px] font-semibold'>
          Forgot password?
        </Link>
      </div>
      
      <button 
        type='submit' 
        className='bg-black text-white py-[15px] uppercase font-semibold'
      >
        {loading ? (
          <span className="spinner border-white border-[3px] border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}

export default SignInForm;