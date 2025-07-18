import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PositionDetail, Post } from "../model/Post";

interface PostState {
  myPost: Post | null;
  createPost: Post;
  setCreatePost: (updated: Partial<Post>) => void;
  setMyPost: (post: Post) => void;
  updatePositionDetail: (detail: PositionDetail) => void;
  clearMyPost: () => void;
}

const defaultCreatePost: Post = {
  teamId: "",
  userId: "",
  title: "",
  location:"",
  content: "",
  isPublic: true,
  recruitStatus: "OPEN",
  proceedType: "ONLINE",
  endDate: "",
  positions: [],
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
      updatePositionDetail: (detail) =>
        set((state) => {
          const updatedPositions = state.createPost.positions.filter(
            (pos) => pos.position.id !== detail.position.id
          );
          updatedPositions.push(detail);

          return {
            createPost: {
              ...state.createPost,
              positions: updatedPositions,
            },
          };
        }),
      clearMyPost: () => set(() => ({ myPost: null })),
    }),
    {
      name: "post-storage",
      partialize: (state) => ({
        createPost: state.createPost,
        myPost: state.myPost,
      }),
    }
  )
);