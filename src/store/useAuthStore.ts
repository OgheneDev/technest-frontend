import { create } from "zustand";
import axiosInstance, { tokenUtils } from "@/api/axios";
import { AxiosError } from "axios";
import {
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  UpdateDetailsCredentials,
  UpdatePasswordCredentials,
  DeleteAccountCredentials,
  ForgotPasswordCredentials,
} from "@/types/auth";
import { ErrorResponse } from "@/types/error";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage?: string;
}

interface AuthStore {
  authUser: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isDeleting: boolean;

  // Auth methods
  checkAuth: () => Promise<void>;
  signup: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (credentials: ForgotPasswordCredentials) => Promise<void>;
  resetPassword: (
    resetToken: string,
    credentials: ResetPasswordCredentials
  ) => Promise<void>;

  // User management methods
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<void>;
  updateDetails: (details: FormData) => Promise<void>;
  deleteAccount: (credentials: DeleteAccountCredentials) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isAuthenticated: !!tokenUtils.getToken(),
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isDeleting: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");

      if (response.status === 200 && response.data?.data) {
        set({ authUser: response.data.data, isAuthenticated: true });
      } else {
        set({ authUser: null, isAuthenticated: false });
        tokenUtils.removeToken();
      }
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, isAuthenticated: false });
      tokenUtils.removeToken();
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (credentials: RegisterCredentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
        credentials
      );

      if (response.status === 200) {
        // Optionally auto-login after registration
        // Or redirect to login page
        window.location.href = "/login";
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const serverMessage =
        axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        axiosError.message;
      throw new Error(serverMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);

      if (response.data?.token) {
        const { token } = response.data;

        // Set token in local storage for axios
        tokenUtils.setToken(token);

        // Fetch user data after successful login
        await get().checkAuth();

        return;
      }

      throw new Error("Invalid response from server");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.status === 401) {
        throw new Error("Invalid email or password");
      }

      throw new Error(axiosError.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      // Clear token and user data
      tokenUtils.removeToken();
      set({ authUser: null, isAuthenticated: false });

      // Redirect to home/login page
      window.location.href = "/";
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  forgotPassword: async (credentials: ForgotPasswordCredentials) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/forgotpassword",
        credentials
      );

      if (response.status !== 200) {
        throw new Error("Failed to send reset email");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || "Forgot password failed"
      );
    }
  },

  resetPassword: async (
    resetToken: string,
    credentials: ResetPasswordCredentials
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/auth/resetpassword/${resetToken}`,
        credentials
      );

      if (response.status === 200) {
        // Redirect to login page after successful password reset
        window.location.href = "/login";
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || "Password reset failed"
      );
    }
  },

  updatePassword: async (credentials: UpdatePasswordCredentials) => {
    try {
      const response = await axiosInstance.put(
        "/api/auth/updatepassword",
        credentials
      );

      if (response.status === 200 && response.data?.token) {
        const { token } = response.data;

        // Update token since it's regenerated on password change
        tokenUtils.setToken(token);

        // Optionally refresh user data
        await get().checkAuth();
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || "Password update failed"
      );
    }
  },

  updateDetails: async (details: FormData) => {
    try {
      const response = await axiosInstance.put(
        "/api/auth/updatedetails",
        details,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data?.data) {
        // Update user data in store
        set({ authUser: response.data.data });
      }

      return response.data.data;
    } catch (error: any) {
      console.error(
        "Update details error:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to update profile details";
      throw new Error(errorMessage);
    }
  },

  deleteAccount: async (credentials: DeleteAccountCredentials) => {
    set({ isDeleting: true });
    try {
      const response = await axiosInstance.delete("/api/auth/deleteaccount", {
        data: credentials,
      });

      if (response.status === 200) {
        // Clear authentication data
        tokenUtils.removeToken();
        set({ authUser: null, isAuthenticated: false });

        // Redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || "Account deletion failed"
      );
    } finally {
      set({ isDeleting: false });
    }
  },
}));
