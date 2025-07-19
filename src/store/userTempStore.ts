import {create} from "zustand";
import type {User} from "./userStore.ts";

interface UserTempStore {
  user: User | null;
  actions: {
    setUser: (user: User) => void;
  }
}

const useUserTempStore = create<UserTempStore>((set) => ({
    user: null,
    actions: {
      setUser: (user: User) => {
        set(() => ({user: user}))
      }
    }
  })
)

export const useUserTemp = () => useUserTempStore((state) => state.user);
export const useSetUserTemp = () => useUserTempStore((state) => state.actions.setUser);