import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'wishlists'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const wishlistItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setWishlist(wishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) {
      Swal.fire({
        title: "Warning!",
        text: "You need to login before adding items to your wishlist!",
        icon: "warning"
      });
      return;
    }

    // Check if product is already in wishlist
    if (isInWishlist(product.id)) return;

    try {
      await addDoc(collection(db, 'wishlists'), {
        ...product,
        userId: user.uid
      });

      setWishlist(prev => [...prev, product]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      // Find and delete the wishlist document
      const q = query(
        collection(db, 'wishlists'),
        where('userId', '==', user.uid),
        where('id', '==', productId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, 'wishlists', document.id));
      });

      // Update local state
      setWishlist(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};