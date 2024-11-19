import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2"; // Ensure you have SweetAlert2 installed
import { auth } from "../firebaseConfig";

const SignInContext = createContext(null);

export const SignInContextProvider = ({children}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state

    // Check for valid email
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      // Handle different Firebase authentication errors
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many login attempts. Please try again later.");
          break;
        default:
          setError("Failed to login. Please check your credentials.");
          console.error("Error: ", err.message);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit
  }

  return (
    <SignInContext.Provider value={value}>
        {children}
    </SignInContext.Provider>
  )
}

export const useSignInContext = () => {
    return useContext(SignInContext)
}