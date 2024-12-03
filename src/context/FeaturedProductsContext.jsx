import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FeatProductsContext = createContext(null);

export const FeatProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("cases");
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  const fetchFeaturedProducts = async (category) => {
    try {
      const q = query(
        collection(db, "products"),
        where("featured", "==", true),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
      setActiveIndex(0); // Reset to the first slide
    } catch (error) {
      console.error("Error fetching featured products: ", error);
    } finally{
      setLoading(false);
    }
  };

  // Handle slider navigation
  const handleNavigate = (direction) => {
    const container = sliderRef.current;
    const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 4 : 2);
    let nextIndex = activeIndex;

    if (direction === "next" && activeIndex < products.length - 1) {
      nextIndex += 1;
    } else if (direction === "prev" && activeIndex > 0) {
      nextIndex -= 1;
    }

    container.scrollTo({
      left: cardWidth * nextIndex,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  };

  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = sliderRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 4 : 2);
      const currentIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(currentIndex);
    };

    const container = sliderRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchFeaturedProducts(selectedCategory);
  }, [selectedCategory]);

  const value = {
    products,
    activeIndex,
    sliderRef,
    selectedCategory,
    loading,
    setSelectedCategory,
    handleNavigate,
  };

  return <FeatProductsContext.Provider value={value}>{children}</FeatProductsContext.Provider>;
};

export const useFeaturedProducts = () => {
  const context = useContext(FeatProductsContext);
  if (!context) {
    throw new Error("useFeaturedProducts must be used within a FeatProductsProvider");
  }
  return context;
};
