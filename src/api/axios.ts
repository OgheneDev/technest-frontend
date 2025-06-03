// lib/axios.ts
import axios from "axios"

// Token utilities
export const tokenUtils = {
  getToken: () => {
    try {
      return localStorage.getItem("authToken")
    } catch (error) {
      console.error("Error reading token:", error)
      return null
    }
  },
  setToken: (token: string) => {
    try {
      localStorage.setItem("authToken", token)
    } catch (error) {
      console.error("Error setting token:", error)
    }
  },
  removeToken: () => {
    try {
      localStorage.removeItem("authToken")
    } catch (error) {
      console.error("Error removing token:", error)
    }
  }
}

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: "https://technest-ohai.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})

// ✅ Request interceptor: add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ✅ Optional: Response interceptor for 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout logic (optional)
      tokenUtils.removeToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
