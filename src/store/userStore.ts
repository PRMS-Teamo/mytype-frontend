import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {TechStackType} from "../model/TeckStack.ts";
import axios from "axios";
export interface User {
  id: string;
  nickname: string;
  profileImage?:string;
  github?: string;
  location?:string;
  beginner?: boolean;
  proceedType?: string;
  createdAt?: string ;
  updatedAt: string;
  positionId?: string;
  isPublic?:boolean;
  userStacks?: TechStackType[];
  description?: string;
  isJoined?: boolean;
  positionName?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  updateJoin: (value: boolean) => void;
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
      updateJoin: (value: boolean) =>
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              isJoined: value,
            },
          };
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export const useUserInfo = () => useUserStore((state) => state.user);