import React, { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const SignUpContext = createContext(null);

export const SignUpContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false }); // Initialize as an object
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation function
  const isPasswordValid = () => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumberOrSpecialChar = /[\d\W]/.test(password); // Matches digits or special characters

    return minLength && hasUppercase && hasLowercase && hasNumberOrSpecialChar;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    const emailError = !emailRegex.test(email);
    const passwordError = !isPasswordValid();

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      // Display alerts to the user
      if (emailError) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid email address.",
          icon: "error",
        });
      }
      if (passwordError) {
        Swal.fire({
          title: "Error",
          text: "Password must be at least 6 characters long, contain at least one uppercase and one lowercase letter, and include at least one number or special character.",
          icon: "error",
        });
      }
      return; // Stop execution if there are errors
    }

    // If no errors, proceed with user registration
    try {
      setIsLoading(true); // Start loading
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to the homepage after successful registration
    } catch (err) {
      console.error(err.message);
      Swal.fire({
        title: "Registration Failed",
        text: "An error occurred during registration. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const value = {
    email,
    password,
    isLoading,
    errors,
    setEmail,
    setPassword,
    setIsLoading,
    setErrors,
    navigate,
    handleSubmit,
  };

  return (
    <SignUpContext.Provider value={value}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  return useContext(SignUpContext);
};
