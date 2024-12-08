import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FeaturedProductsContext = createContext(null);

export const FeaturedProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("cases");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  const fetchFeaturedProducts = useCallback(async (category) => {
    console.log(`Fetching products for category: ${category}`);
    
    try {
      setLoading(true);
      setError(null);
      setProducts([]);

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

      console.log(`Fetched products for ${category}:`, fetchedProducts);

      setProducts(fetchedProducts);
      setActiveIndex(0);
      setError(fetchedProducts.length === 0 ? "No products found" : null);
    } catch (error) {
      console.error(`Error fetching featured products for ${category}:`, error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNavigate = (direction) => {
    if (!sliderRef.current || products.length === 0) return;

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

  useEffect(() => {
    console.log("Selected category changed:", selectedCategory);
    fetchFeaturedProducts(selectedCategory);
  }, [selectedCategory, fetchFeaturedProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current) return;

      const container = sliderRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 4 : 2);
      const currentIndex = Math.round(scrollPosition / cardWidth);

      setActiveIndex(currentIndex);
    };

    const container = sliderRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const value = {
    products,
    activeIndex,
    sliderRef,
    selectedCategory,
    loading,
    error,
    setSelectedCategory,
    handleNavigate,
  };

  return (
    <FeaturedProductsContext.Provider value={value}>
      {children}
    </FeaturedProductsContext.Provider>
  );
};

export const useFeaturedProducts = () => {
  const context = useContext(FeaturedProductsContext);
  if (!context) {
    throw new Error("useFeaturedProducts must be used within a FeaturedProductsProvider");
  }
  return context;
};
