import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from "axios";
export interface User {
  id: string;
  nickname?: string;
  profileImage?:string;
  address?: string;
  github?: string;
  location?:string;
  beginner?: boolean;
  proceedType?: string;
  createdAt?: string ;
  updatedAt: string;
  position?: string;
  positionId?: string;
  isPublic?:boolean;
  userStack?: string[];
  description?: string;
  public?:boolean;
  isJoined?: boolean;

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
      clearUser: async () => {
        set({ user: null, isLoggedIn: false })
        const accessToken = localStorage.getItem('accessToken');
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout/full`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        localStorage.removeItem('refreshToken'); // 토큰 지우는 로직 추가
        localStorage.removeItem('accessToken');
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export const useUserInfo = () => useUserStore((state) => state.user);