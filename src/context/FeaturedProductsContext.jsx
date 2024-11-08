import React, { useState, useEffect, useContext, createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSwipeable } from "react-swipeable";
import { db } from '../firebaseConfig';

const FeatProductsContext = createContext(null);

export const FeatProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('cases');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2); // Default to 2 for mobile

  // Function to fetch featured products based on category
  const fetchFeaturedProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("featured", "==", true),
        where("category", "==", selectedCategory)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(fetchedProducts);
      setCurrentSlide(0); // Reset the slide index when new products are fetched
    } catch (error) {
      console.error("Error fetching featured products: ", error);
    }
  };

  // Fetch "cases" category by default on component mount
  useEffect(() => {
    fetchFeaturedProducts();
  }, [selectedCategory]);

  // Function to calculate items per slide based on screen width
  const calculateItemsPerSlide = () => {
    setItemsPerSlide(window.innerWidth >= 1024 ? 6 : 2);
  };

  // Update items per slide on initial render and when window resizes
  useEffect(() => {
    calculateItemsPerSlide(); // Set initial value
    window.addEventListener('resize', calculateItemsPerSlide); // Update on resize

    return () => window.removeEventListener('resize', calculateItemsPerSlide); // Cleanup on unmount
  }, []);

  // Function to advance the slide, stopping at the last full row of items
  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, Math.max(0, Math.floor((products.length - 1) / itemsPerSlide))));
  };

  // Function to go back a slide, stopping at the first item
  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  const value = {
    products,
    selectedCategory,
    setSelectedCategory,
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

