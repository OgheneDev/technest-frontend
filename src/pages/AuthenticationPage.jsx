import React from 'react';
import { useAuth } from '../context/AuthContext';
import AccountBanner from '../components/AuthPage/AccountBanner';
import SignInForm from '../components/AuthPage/SignInForm';
import SignUpForm from '../components/AuthPage/SignUpForm';

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      <AccountBanner />

      {user && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-gray-300 rounded-full  flex items-center justify-center">
              {user.email?.charAt(0).toUpperCase()}
            </div>
              <div className="text-lg font-medium text-gray-700 truncate max-w-xs sm:max-w-sm">
                {user.email}
              </div>
            </div>
            <button
              className="mt-2 sm:mt-0 bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <p>Email: {user.email}</p>
            <p>Account Created: {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            <p>Last Login: {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            <div className="flex flex-col">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-2">Change Password</button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update Profile</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AuthenticationPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <UserProfile />
      ) : (
        <div>
          <SignInForm />
          <SignUpForm />
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
