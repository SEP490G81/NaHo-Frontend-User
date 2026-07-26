import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionScoringResponse } from "@/types/responses/speaking.response";

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

/** Phiên hội thoại đang chạy (trả về từ POST /speaking/session/{personaId}). */
export interface ChatSession {
    sessionId: string;
    personaId: number;
    companionId: string;
    aiGreeting: string;
    /** WAV base64 câu chào — không persist (chỉ dùng trong bộ nhớ). */
    greetingAudioBase64?: string;
}

interface ChatState {
    config: ChatConfig | null;
    session: ChatSession | null;
    report: SessionScoringResponse | null;
    setConfig: (config: ChatConfig) => void;
    setSession: (session: ChatSession) => void;
    setReport: (report: SessionScoringResponse | null) => void;
    reset: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            config: null,
            session: null,
            report: null,
            setConfig: (config) => set({ config }),
            setSession: (session) => set({ session }),
            setReport: (report) => set({ report }),
            reset: () => set({ session: null, report: null }),
        }),
        {
            name: "naho-chat",
            // Không persist audio base64 (lớn) & report (chỉ cần trong phiên).
            partialize: (state) => ({
                config: state.config,
                session: state.session
                    ? {
                          sessionId: state.session.sessionId,
                          personaId: state.session.personaId,
                          companionId: state.session.companionId,
                          aiGreeting: state.session.aiGreeting,
                      }
                    : null,
                report: state.report,
            }),
        },
    ),
);
