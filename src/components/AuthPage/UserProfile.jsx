import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';
import { Mail, Phone, Pencil, LogOut, MapPin, ChevronRight, Banknote, Ban, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNumber: '',
    email: user?.email || '',
    address: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle input change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Save updated user details to Firestore
  const handleSave = async () => {
    if (user?.uid) {
      try {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, userData);
        setEditing(false);
      } catch (error) {
        console.error('Error saving user data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle Dropdown
  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <div className="p-4 max-w-screen-sm mx-auto">
      {user && (
        <div className="p-4">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-white">
              {userData.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-bs-indigo">{userData.fullName || 'User Name'}</h2>
              <p className="text-grey text-[13px] w-[200px] md:w-auto truncate flex gap-2 items-center font-semibold">
                <Mail size={15} />
                {userData.email}
              </p>
              <p className="text-grey text-[13px] flex gap-2 items-center font-semibold">
                <Phone size={15} />
                {userData.phoneNumber}
              </p>
            </div>
            <button
              className="text-white bg-bs-indigo p-3 rounded-full"
              onClick={() => setEditing((prev) => !prev)}
            >
              {editing ? <Ban size={20} /> : <Pencil size={20} />}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full bg-gray-100 border flex gap-2 items-center justify-center mb-7 text-bs-indigo py-3 px-4 rounded mt-4"
          >
            <LogOut size={20} />
            Logout
          </button>

          {/* Editable Fields */}
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  disabled // Email is non-editable
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-bs-indigo text-white py-3 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <div className="text-grey-dark">
              <div className="py-5 border-b border-b-gray-300 space-y-[30px]">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDropdown('address')}>
                  <div className="flex items-center gap-2 text-[14px]">
                    <MapPin size={20} />
                    Address
                  </div>
                  <ChevronRight
                    size={20}
                    className={`transform transition-transform ${openDropdown === 'address' ? 'rotate-90' : ''}`}
                  />
                </div>
                {openDropdown === 'address' && (
                  <div className="ml-8 text-[14px] text-gray-700">
                    {userData.address || 'No address saved'}
                  </div>
                )}

                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDropdown('payment')}>
                  <div className="flex items-center gap-2 text-[14px]">
                    <Banknote size={20} />
                    Payment Method
                  </div>
                  <ChevronRight
                    size={20}
                    className={`transform transition-transform ${openDropdown === 'payment' ? 'rotate-90' : ''}`}
                  />
                </div>
                {openDropdown === 'payment' && (
                  <div className="ml-8 text-[14px] text-gray-700">
                    {localStorage.getItem('paymentMethod') || 'No payment method saved'}
                  </div>
                )}

                <div className="flex items-center justify-between cursor-pointer" onClick={() => navigate('/wishlist')}>
                  <div className="flex items-center gap-2 text-[14px]">
                    <Heart size={20} />
                    Wishlist
                  </div>
                  <ChevronRight size={20} />
                </div>
              </div>

              <div className="py-5 space-y-[30px]">
                <div className="flex items-center justify-between text-[14px]">
                  Terms of Service
                  <ChevronRight size={20} />
                </div>

                <div className="flex items-center justify-between text-[14px]">
                  Privacy Policy
                  <ChevronRight size={20} />
                </div>

                <div className="flex items-center justify-between text-[14px]" onClick={() => navigate('/about-us')}>
                  About
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
