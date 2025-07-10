import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PositionType, PositionDetail, CreatePost, Post } from "../model/Post";

interface PostState {
  newPost: Post[];
  createPost: CreatePost;
  setCreatePost: (updated: Partial<CreatePost>) => void;
  updatePositionDetail: (position: PositionType, detail: PositionDetail) => void;
  addPost: (post: Post) => void;
  deletePost: (id: number) => void;
}

const defaultCreatePost: CreatePost = {
  author: "",
  filter:"",
  title: "",
  content: "",
  createdAt: new Date().toISOString(),
  region: "",
  proceedMethod: "",
  deadline: "",
  techStack: [],
  positionCount: {},
};

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      newPost: [],
      createPost: defaultCreatePost,
      setCreatePost: (updated) =>
        set((state) => ({
          createPost: { ...state.createPost, ...updated },
        })),

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

      addPost: (post) =>
        set((state) => ({
          newPost: [...state.newPost, post],
        })),

      deletePost: (id) =>
        set((state) => ({
          newPost: state.newPost.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "post-storage",
    }
  )
);