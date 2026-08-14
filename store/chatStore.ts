import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
    SessionMessageItem,
    SessionScoringResponse,
} from "@/types/responses/speaking.response";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";

export interface ChatConfig {
    companionId: string;
    /** Thể lịch sự: INFORMAL (Thân mật) / NEUTRAL (Lịch sự) / FORMAL (Kính ngữ). */
    conversationStyle: FormalityLevel;
    /** Cấp độ Marugoto của phiên. */
    marugotoLevel: MarugotoLevel;
    voiceSpeed: number;
    showHints: boolean;
}

export const defaultChatConfig: ChatConfig = {
    companionId: "sakura",
    conversationStyle: "NEUTRAL",
    marugotoLevel: "STARTER_A1",
    voiceSpeed: 1,
    showHints: true,
};

/** Phiên hội thoại đang chạy (trả về từ POST /speaking/session/{personaId}). */
export interface ChatSession {
    sessionId: string;
    personaId: number;
    companionId: string;
    aiGreeting: string;
    /** Bản dịch + giải thích ngữ pháp câu chào. */
    greetingTranslation?: string | null;
    greetingGrammar?: string | null;
    /** WAV base64 câu chào — không persist (chỉ dùng trong bộ nhớ). */
    greetingAudioBase64?: string;
    /** Tin nhắn cũ khi khôi phục phiên dở — không persist. */
    resumedMessages?: SessionMessageItem[];
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
