import React, { useState, useEffect, useContext, createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSwipeable } from "react-swipeable";
import { db } from '../firebaseConfig';

const FeatProductsContext = createContext(null);

export const FeatProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

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
      setCurrentSlide(0); // Reset the slide index when new products are fetched
      console.log("Products: ", fetchedProducts);
    } catch (error) {
      console.error("Error fetching featured products: ", error);
    }
  };

  // Function to calculate items per slide based on screen width
  const calculateItemsPerSlide = () => {
    setItemsPerSlide(window.innerWidth >= 1024 ? 4 : 2);
  };

  // Update items per slide on initial render and when window resizes
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  const value = {
    products,
    swipeHandlers,
    currentSlide,
    itemsPerSlide,
    fetchFeaturedProducts,
    nextSlide,
    prevSlide
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

