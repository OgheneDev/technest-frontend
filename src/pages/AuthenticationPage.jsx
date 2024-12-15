import React from 'react';
import { useAuth } from '../context/AuthContext';
import SignInForm from '../components/AuthPage/SignInForm';
import SignUpForm from '../components/AuthPage/SignUpForm';
import UserProfile from '../components/AuthPage/UserProfile';

const AuthenticationPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <UserProfile />
      ) : (
        <div className='md:flex flex-row md:px-[100px] md:gap-[50px] md:py-[50px]'>
          <SignInForm />
          <SignUpForm />
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
