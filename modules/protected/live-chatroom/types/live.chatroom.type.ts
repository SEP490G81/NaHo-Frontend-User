export interface Companion {
    id: string;
    name: string;
    role: string;
    description: string;
    prompt?: string;
    level: string;
    accent: string;
    matchKeyword: string;
    personaId?: number | null;
    defaultFormality?:
        | import("@/types/responses/persona.response").FormalityLevel
        | null;
    defaultMarugotoLevel?:
        | import("@/types/responses/persona.response").MarugotoLevel
        | null;
}

export type AiChatMessage = {
    id: string;
    role: "ai";
    text: string;
    audioBase64?: string;
    translation?: string | null;
    grammar?: string | null;
    timestamp: string;
    autoPlay?: boolean;
};

export type UserChatMessage = {
    id: string;
    role: "user";
    text: string;
    pronunciationScore?: number | null;
    correction?: { correctedText: string; explanation: string } | null;
    timestamp: string;
};

export type ChatMessage = AiChatMessage | UserChatMessage;
