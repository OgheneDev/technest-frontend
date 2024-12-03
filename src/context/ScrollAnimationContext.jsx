import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

// Create the ScrollAnimationContext
const ScrollAnimationContext = createContext();

// Custom hook for scroll-based animation
const useScrollAnimationHook = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// ScrollAnimationProvider to wrap the application
export const ScrollAnimationProvider = ({ children }) => {
  const value = { useScrollAnimationHook };
  return (
    <ScrollAnimationContext.Provider value={value}>
      {children}
    </ScrollAnimationContext.Provider>
  );
};

// Custom hook to use ScrollAnimationContext
export const useScrollAnimation = () => {
  const context = useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error('useScrollAnimation must be used within a ScrollAnimationProvider');
  }
  return context.useScrollAnimationHook;
};
