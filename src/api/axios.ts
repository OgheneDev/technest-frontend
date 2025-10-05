// src/api/axios.ts
import axios from "axios";

// Token utilities
export const tokenUtils = {
  getToken: () => {
    try {
      // Check if running in the browser
      if (typeof window !== "undefined") {
        return localStorage.getItem("authToken");
      }
      return null; // Return null if running on the server
    } catch (error) {
      console.error("Error reading token:", error);
      return null;
    }
  },
  setToken: (token: string) => {
    try {
      // Check if running in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token);
      }
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },
  removeToken: () => {
    try {
      // Check if running in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: "https://technest-ohai.onrender.com",
  timeout: 3600000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;