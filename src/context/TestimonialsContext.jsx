import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const TestimonialContext = createContext(null);

export const TestimonialContextProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch testimonials from Firestore
  const fetchTestimonials = async () => {
    try {
      const q = query(collection(db, "testimonials"));
      const querySnapshot = await getDocs(q);
      const fetchedTestimonials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(fetchedTestimonials);
      setCurrentSlide(0); // Reset to the first slide
    } catch (error) {
      console.error("Error fetching Testimonials: ", error);
    }
  };

  // Determine number of items per slide based on screen width
  const calculateItemsPerSlide = () => {
    setItemsPerSlide(window.innerWidth >= 1024 ? 2 : 1);
  };

  useEffect(() => {
    calculateItemsPerSlide();
    window.addEventListener('resize', calculateItemsPerSlide);
    return () => window.removeEventListener('resize', calculateItemsPerSlide);
  }, []);

  // Navigation for slides
  const maxSlideIndex = Math.max(0, Math.ceil(testimonials.length / itemsPerSlide) - 1);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlideIndex));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  // Handle touch events for mobile swiping
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
    testimonials,
    currentSlide,
    itemsPerSlide,
    fetchTestimonials,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };

  return (
    <TestimonialContext.Provider value={value}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonialsContext = () => {
  const context = useContext(TestimonialContext);
  if (!context) {
    throw new Error("useTestimonialsContext must be used within a TestimonialContextProvider");
  }
  return context;
};


