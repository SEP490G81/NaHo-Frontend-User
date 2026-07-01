import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChatTone = "casual" | "business" | "interview";
export type ChatKeigo = "auto" | "sonkeigo" | "kenjougo";

export interface ChatConfig {
  companionId: string;
  tone: ChatTone;
  keigo: ChatKeigo;
  voiceSpeed: number;
  showTranslation: boolean;
  showHints: boolean;
}

export const defaultChatConfig: ChatConfig = {
  companionId: "sakura",
  tone: "casual",
  keigo: "auto",
  voiceSpeed: 1,
  showTranslation: true,
  showHints: true,
};

interface ChatState {
  config: ChatConfig | null;
  setConfig: (config: ChatConfig) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      config: null,
      setConfig: (config) => set({ config }),
      reset: () => set({ config: null }),
    }),
    { name: "naho-chat" },
  ),
);
