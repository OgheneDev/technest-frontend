// FetchCategories.js
import React, { useState, useEffect, useContext, createContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FetchCategoriesContext = createContext(null);

export const FetchCategoriesContextProvider = ({ children, categoryName }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {

                // Create a query to fetch products by category
                const q = query(
                    collection(db, 'products'),
                    where('category', '==', categoryName)
                );

                const querySnapshot = await getDocs(q);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category products. ', error);
                setLoading(false);
            }
        };

        if (categoryName) {
            fetchCategoryProducts();
        }
    }, [categoryName]);

    const value = {
        products,
        loading,
        categoryName,
    };

    return (
        <FetchCategoriesContext.Provider value={value}>
            {children}
        </FetchCategoriesContext.Provider>
    );
};

export const useFetchedCategoryProducts = () => {
    const context = useContext(FetchCategoriesContext);
    if (!context) {
        throw new Error("useFetchCategoryProducts must be used within the FetchCategoriesContextProvider");
    }
    return context;
};