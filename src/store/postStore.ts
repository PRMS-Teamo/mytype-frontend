import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PositionType, PositionDetail, Post } from "../model/Post";

interface PostState {
  myPost: Post | null;
  createPost: Post;
  setCreatePost: (updated: Partial<Post>) => void;
  setMyPost: (post: Post) => void;
  updatePositionDetail: (position: PositionType, detail: PositionDetail) => void;
  clearMyPost: () => void;
}

const defaultCreatePost: Post = {
  id:"",
  userId: "",
  nickname: "",
  title: "",
  content: "",
  createdAt: new Date().toISOString(),
  region: "",
  proceedMethod: "",
  deadline: "",
  techStacks: [],
  positionCount: {},
};

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      myPost: null,
      createPost: defaultCreatePost,
      setCreatePost: (updated) =>
        set((state) => ({
          createPost: { ...state.createPost, ...updated },
        })),
      setMyPost: (post) => set(() => ({ myPost: post })),
      updatePositionDetail: (position, detail) =>
        set((state) => ({
          createPost: {
            ...state.createPost,
            positionCount: {
              ...state.createPost.positionCount,
              [position]: detail,
            },
          },
        })),
      clearMyPost: () => set(() => ({ myPost: null })),
    }),
    {
      name: "post-storage",
      partialize: (state) => ({
        createPost: state.createPost,
        myPost: state.myPost, // ✅ 추가
      }),
    }
  )
);