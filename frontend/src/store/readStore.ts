import { create } from "zustand";

interface ReadState {
  readKeys: Set<string>;
  isRead: (key: string) => boolean;
  markAsRead: (key: string) => void;
}

export const useReadStateStore = create<ReadState>((set, get) => ({
  readKeys: new Set(),
  isRead: (key) => get().readKeys.has(key),
  markAsRead: (key) =>
    set((state) => ({
      readKeys: new Set(state.readKeys).add(key),
    })),
}));
