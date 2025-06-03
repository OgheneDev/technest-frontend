import axiosInstance, {tokenUtils} from "../axios";
import { AxiosError } from "axios";
import { LoginCredentials, LoginResponse, RegisterCredentials } from "@/types/auth";
import { ErrorResponse } from "@/types/error";

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