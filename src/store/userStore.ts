import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
  id: string;
  name: string;
  email?: string;
  region?: string;
  github?: string;
  beginner?: boolean | null;
  proceedMethod?: string;
  position?: string;
  hasProfile: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}


export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      clearUser: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);