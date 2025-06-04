import { create } from 'zustand'
import { tokenUtils } from '@/api/axios'

interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: !!tokenUtils.getToken(),
  token: tokenUtils.getToken(),
  
  setToken: (token: string) => {
    tokenUtils.setToken(token);
    set({ token, isAuthenticated: true });
  },
  
  logout: () => {
    tokenUtils.removeToken();
    set({ token: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const { isAuthenticated } = get();
    return isAuthenticated;
  },
}));
