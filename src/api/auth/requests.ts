import axiosInstance, {tokenUtils} from "../axios";
import { AxiosError } from "axios";
import { LoginCredentials, LoginResponse, RegisterCredentials, ResetPasswordCredentials, UpdateDetailsCredentials, UpdatePasswordCredentials, DeleteAccountCredentials, ForgotPasswordCredentials } from "@/types/auth";
import { ErrorResponse } from "@/types/error";
import Cookies from 'js-cookie'

export const register = async ({ email, password, firstName, lastName, phoneNumber }: RegisterCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.post(
        '/api/auth/register',
        { email, password, firstName, lastName, phoneNumber }
    );

    if (response.status === 200) {
            window.location.href = "/login"
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
        const serverMessage = axiosError.response?.data?.error || 
                            axiosError.response?.data?.message || 
                            axiosError.message;
        throw new Error(serverMessage);
  }
}

export const login = async ({email, password }: LoginCredentials): Promise<void> => {
    try {
        const response = await axiosInstance.post(
            '/api/auth/login',
            { email, password }
        );

        // Only proceed if we have a valid token
        if (response.data?.token) {
            const { token } = response.data
            // Set token in local storage for axios
            tokenUtils.setToken(token);
            // Set token for middleware auth
            document.cookie = `frontendToken=${token}; path=/; max-age=${60*60*24*7}; SameSite=Lax`;
            return;
        }
        throw new Error('Invalid response from server');
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 401) {
          throw new Error('Invalid email or password');
        }
          throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
}

export const forgotPassword = async ({ email }: ForgotPasswordCredentials): Promise<void> => {
    try {
      const response = await axiosInstance.post(
        '/api/auth/forgotpassword',
        { email } 
      );
      
      if (response.status === 200) {
        return;
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Forgot Password failed');
    }
}

export const resetPassword = async (resetToken: string, { password }: ResetPasswordCredentials): Promise<void> => {
  try {
      const response = await axiosInstance.put(
          `/api/auth/resetpassword/${resetToken}`,
          { password }
      );

      if (response.status === 200) {
          // Redirect to login page after successful password reset
          window.location.href = '/login';
      }
  } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Password reset failed');
  }
}

export const getMe = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      const { data, status } = response
        if (response.status !== 200) {
        throw new Error('Failed to fetch user');
      }
      return data.data
    } catch (error) {
      console.error("Error Fetching data", error);
      return[];
    }
}

export const logout = () => {
  // Clear localStorage token
  tokenUtils.removeToken();
  
  // Clear the frontend cookie
  document.cookie = "frontendToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // Redirect to login page
  window.location.href = '/login';
}

// New functions for user management

export const updatePassword = async ({ currentPassword, newPassword }: UpdatePasswordCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      '/api/auth/updatepassword',
      { currentPassword, newPassword }
    );
    
    if (response.status === 200) {
      // Update token since it will be regenerated on password change
      const { token } = response.data;
      
      // Store in localStorage (for axios)
      tokenUtils.setToken(token);
      
      // Store in cookie (for middleware)
      Cookies.set('authToken', token, {
        expires: 7,
        secure: true,
        sameSite: 'lax',
      });
      
      // Could redirect or show success message
      return Promise.resolve();
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Password update failed');
  }
}

export const updateDetails = async (details: FormData): Promise<any> => {
  try {
    const response = await axiosInstance.put(
      '/api/auth/updatedetails',
      details,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error(errorMessage || 'Failed to update profile details');
  }
}

export const deleteAccount = async ({ password }: DeleteAccountCredentials): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      '/api/auth/deleteaccount',
      { 
        data: { password } // For DELETE requests, axios requires data to be in this format
      }
    );
    
    if (response.status === 200) {
      // Clear authentication data
      tokenUtils.removeToken();
      Cookies.remove('authToken');
      
      // Redirect to login page
      window.location.href = '/login';
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'Account deletion failed');
  }
}