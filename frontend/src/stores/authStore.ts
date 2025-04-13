import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher';
};

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage', // key untuk localStorage
    }
  )
);