import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CommentItem {
  id: string;
  postId: number;
  authorName: string;
  position: string;
  content: string;
}

interface CommentState {
  comments: CommentItem[];
  addComment: (comment: Omit<CommentItem, "id">) => void;
  getCommentsByPostId: (postId: number) => CommentItem[];
  deleteComment: (id: string) => void;
}

export const useCommentStore = create<CommentState>()(
  persist(
    (set, get) => ({
      comments: [],

      addComment: (newComment) =>
        set((state) => ({
          comments: [
            ...state.comments,
            {
              id: crypto.randomUUID(), 
              ...newComment,
            },
          ],
        })),

      getCommentsByPostId: (postId) =>
        get().comments.filter((comment) => comment.postId === postId),

      deleteComment: (id) =>
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== id),
        })),
    }),
    {
      name: "comment-storage",
    }
  )
);