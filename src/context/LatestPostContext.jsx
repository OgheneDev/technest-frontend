import React, {useContext, createContext, useEffect, useState} from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const LatestPostsContext = createContext(null);

export const LatestPostsProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
       try {
        setLoading(true);
        const q = query(
          collection(db, "posts")
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setPosts(fetchedPosts);
       } catch (error) {
        console.error("Error fetching featured posts: ", error);
       } finally {
        setLoading(false);
       }
    };
   
    const value = {
       posts,
       loading,
       setPosts,
       fetchPosts
    }

    return(
        <LatestPostsContext.Provider value={value}>
            {children}
        </LatestPostsContext.Provider>
    );
};

export const useLatestPosts = () => {
    const context = useContext(LatestPostsContext);
    if (!context) {
        throw new Error("useLatestPosts must be used within a LatestPostsProvider");
        
    }
    return context;
};