import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface User {
  userId: string;
  nickname: string;
  address?: string;
  github?: string;
  beginner?: boolean ;
  proceedMethod?: string;
  position?: string;
  techStack?: string[];
  introduction?: string;
  public?:boolean;
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
      clearUser: () => {
        set({ user: null, isLoggedIn: false })
        localStorage.removeItem('refreshToken'); // 토큰 지우는 로직 추가
        localStorage.removeItem('accessToken');
      },
    }),
    {
      name: 'user-storage',
    }
  )
);