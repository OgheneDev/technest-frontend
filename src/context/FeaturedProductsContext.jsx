import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const FeatProductsContext = createContext(null);

export const FeatProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [loading, setLoading] = useState(false);

  const fetchFeaturedProducts = async (category) => {
    try {
      setLoading(true);
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
      setCurrentSlide(0); // Reset to the first slide
    } catch (error) {
      console.error("Error fetching featured products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateItemsPerSlide = () => {
    setItemsPerSlide(window.innerWidth >= 1024 ? 4 : 2);
  };

  useEffect(() => {
    calculateItemsPerSlide();
    window.addEventListener('resize', calculateItemsPerSlide);
    return () => window.removeEventListener('resize', calculateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, Math.max(0, Math.floor((products.length - 1) / itemsPerSlide))));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  const value = {
    products,
    currentSlide,
    itemsPerSlide,
    loading,
    fetchFeaturedProducts,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
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


