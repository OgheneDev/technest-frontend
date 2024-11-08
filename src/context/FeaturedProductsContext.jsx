import React, { useState, useContext, createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Correctly import db without reinitializing

const FeatProductsContext = createContext(null);

export const FeatProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);

  // Function to fetch featured products based on category
  const fetchFeaturedProducts = async (category) => {
    try {
      const q = query(
        collection(db, "products"),
        where("featured", "==", true),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching featured products: ", error);
    }
  };

  const value = {
    products,
    fetchFeaturedProducts,
  };

  return (
    <FeatProductsContext.Provider value={value}>
      {children}
    </FeatProductsContext.Provider>
  );
};

export const useFeaturedProducts = () => {
  const context = useContext(FeatProductsContext);
  if (!context) {
    throw new Error('useFeaturedProducts must be used within a FeatProductsProvider');
  }
  return context;
};

