import { create } from "zustand";
import {
  persist,
  // createJSONStorage
} from "zustand/middleware";

interface SynthesizeItem {
  id: string;
  content: string;
}

import type { Chat } from "@/types/chat";

export interface AssistantSource {
  name?: string;
  icon?: string;
  [key: string]: unknown;
}

export interface Assistant {
  _id: string;
  _source?: AssistantSource;
}

export type IChatStore = {
  curChatEnd: boolean;
  setCurChatEnd: (value: boolean) => void;
  stopChat: boolean;
  setStopChat: (value: boolean) => void;
  connected: boolean;
  setConnected: (value: boolean) => void;
  messages: string;
  setMessages: (value: string | ((prev: string) => string)) => void;
  synthesizeItem?: SynthesizeItem;
  setSynthesizeItem: (synthesizeItem?: SynthesizeItem) => void;
  hasActiveChat?: boolean;
  setHasActiveChat: (hasActiveChat?: boolean) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  activeChat?: Chat;
  setActiveChat: (chat?: Chat) => void;
  currentAssistant?: Assistant;
  setCurrentAssistant: (assistant?: Assistant) => void;
  assistantList?: Assistant[];
  setAssistantList: (assistantList: Assistant[]) => void;
};

export const useChatStore = create<IChatStore>()(
  persist(
    (set) => ({
      curChatEnd: true,
      setCurChatEnd: (value: boolean) => set(() => ({ curChatEnd: value })),
      stopChat: false,
      setStopChat: (value: boolean) => set(() => ({ stopChat: value })),
      connected: false,
      setConnected: (value: boolean) => set(() => ({ connected: value })),
      messages: "",
      setMessages: (value: string | ((prev: string) => string)) =>
        set((state) => ({
          messages: typeof value === "function" ? value(state.messages) : value,
        })),
      setSynthesizeItem: (synthesizeItem?: SynthesizeItem) => {
        return set(() => ({ synthesizeItem }));
      },
      setHasActiveChat(hasActiveChat) {
        return set(() => ({ hasActiveChat }));
      },
      chats: [],
      setChats: (chats: Chat[]) => set(() => ({ chats })),
      activeChat: undefined,
      setActiveChat: (chat?: Chat) => set(() => ({ activeChat: chat })),
      currentAssistant: undefined,
      setCurrentAssistant: (assistant?: Assistant) =>
        set(() => ({ currentAssistant: assistant })),
      assistantList: [],
      setAssistantList: (assistantList: Assistant[]) =>
        set(() => ({ assistantList })),
    }),
    {
      name: "chat-state",
      // storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeChat: state.activeChat,
        currentAssistant: state.currentAssistant,
        messages: state.messages,
      }),
    }
  )
);
