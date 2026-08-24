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
}

/** Phiên hội thoại đang chạy (trả về từ POST /speaking/session/persona/{personaId}). */
export interface ChatSession {
    sessionCode: string;
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
    autoPlayAudio: boolean;
    setAutoPlayAudio: (autoPlay: boolean) => void;
    setConfig: (config: ChatConfig) => void;
    setSession: (session: ChatSession | null) => void;
    setReport: (report: SessionScoringResponse | null) => void;
    reset: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            config: null,
            session: null,
            report: null,
            autoPlayAudio: true,
            setAutoPlayAudio: (autoPlayAudio) => set({ autoPlayAudio }),
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
                autoPlayAudio: state.autoPlayAudio,
                session: state.session
                    ? {
                          sessionCode: state.session.sessionCode,
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
