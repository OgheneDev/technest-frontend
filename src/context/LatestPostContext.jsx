import React, {useContext, createContext, useEffect, useState} from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const LatestPostsContext = createContext(null);

export const LatestPostsProvider = ({children}) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
       try {
        const q = query(
          collection(db, "posts")
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setPosts(fetchedPosts);
        console.log("Posts:", fetchedPosts)
       } catch (error) {
        console.error("Error fetching featured posts: ", error);
       }
    };
   
    const value = {
       posts,
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