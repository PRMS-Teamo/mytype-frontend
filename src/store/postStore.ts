import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Post} from "../model/Post";

interface PostState {
  myPost: Post | null;
  setMyPost: (post: Post) => void;
  clearMyPost: () => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      myPost: null,
      setMyPost: (post) => set(() => ({ myPost: post })),
      clearMyPost: () => set(() => ({ myPost: null })),
    }),
    {
      name: "post-storage",
      partialize: (state) => ({
        myPost: state.myPost,
      }),
    }
  )
);