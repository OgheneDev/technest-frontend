import React, { useEffect, useContext, createContext, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

const FetchProductsContext = createContext(null);

export const FetchProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const value = {
    products,
    loading
  };

  return (
    <FetchProductsContext.Provider value={value}>
      {children}
    </FetchProductsContext.Provider>
  );
};

export const useFetchedProducts = () => {
  const context = useContext(FetchProductsContext);
  if (!context) {
    throw new Error("useFetchedProducts must be used within the FetchedProductsContextProvider");
  }
  return context;
};