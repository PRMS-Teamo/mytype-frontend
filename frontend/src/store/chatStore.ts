import { create } from 'zustand';

interface ChatState {
  isOpen: boolean;
  currentTab: 'notifications' | 'chat' | 'qna';
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  setTab: (tab: 'notifications' | 'chat' | 'qna') => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  currentTab: 'notifications',
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((s) => ({ isOpen: !s.isOpen })),
  setTab: (tab) => set({ currentTab: tab }),
}));