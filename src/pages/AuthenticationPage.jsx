import React from 'react';
import { useAuth } from '../context/AuthContext';
import AccountBanner from '../components/AuthPage/AccountBanner';
import SignInForm from '../components/AuthPage/SignInForm';
import SignUpForm from '../components/AuthPage/SignUpForm';

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full  flex items-center justify-center">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.email}</h2>
              <p className="text-gray-500">Verified Account</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Account Created:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
              <p><strong>Last Login:</strong> {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Change Password
                </button>
                <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthenticationPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <AccountBanner />
      {user ? (
        <UserProfile />
      ) : (
        <div className="md:flex gap-10 md:px-[150px] md:py-10">
          <SignInForm />
          <SignUpForm />
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;