import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoymAvTQSb1t-lmcYBDStkzpdizttkrEs",
    authDomain: "technest-6c4cb.firebaseapp.com",
    projectId: "technest-6c4cb",
    storageBucket: "technest-6c4cb.firebasestorage.app",
    messagingSenderId: "1055785147418",
    appId: "1:1055785147418:web:8746fd608044478bed85a3",
    measurementId: "G-BCEJTDC95T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export const auth = getAuth(app);

export { db };