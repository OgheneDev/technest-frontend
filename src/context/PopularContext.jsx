import React, { useContext, createContext, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const PopularCategoriesContext = createContext(null);

export const PopularCategoriesProvider = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(2); // Default to 2 for mobile

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
        setCurrentSlide((prev) => (prev < popularCategories.length - itemsPerSlide ? prev + 1 : prev));
    };

    // Function to go back a slide, stopping at the first item
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
    });

    const popularCategories = [
        { id: 1, name: 'Cases', stock: 11, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-1_mh7sca.jpg' },
        { id: 2, name: 'Screen Protectors', stock: 4, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-2_bbyzwf.jpg' },
        { id: 3, name: 'MagSafe', stock: 2, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-3_r12qoc.jpg' },
        { id: 4, name: 'Cables', stock: 10, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988491/shop50-category-4_iav9sb.jpg' },
        { id: 5, name: 'Chargers', stock: 7, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-5_uqrrzi.jpg' },
        { id: 6, name: 'Power Banks', stock: 14, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-6_ruo9b8.jpg' },
        { id: 7, name: 'Headphones', stock: 3, image: 'https://res.cloudinary.com/dgc8cd67w/image/upload/v1730988492/shop50-category-7_yvcx6k.jpg' },
    ];

    const value = {
        currentSlide,
        itemsPerSlide,
        popularCategories,
        swipeHandlers,
        setCurrentSlide,
        nextSlide,
        prevSlide,
    };

    return (
        <PopularCategoriesContext.Provider value={value}>
            {children}
        </PopularCategoriesContext.Provider>
    );
};

export const usePopularCategories = () => {
    const context = useContext(PopularCategoriesContext);
    if (!context) {
        throw new Error('usePopularCategories must be used within a PopularCategoriesProvider');
    }
    return context;
};


