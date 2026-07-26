export interface Companion {
    id: string;
    name: string;
    role: string;
    description: string;
    level: string;
    accent: string; // tailwind bg/text style for avatar tint
}

export type AiChatMessage = {
    id: string;
    role: "ai";
    jp: string;
    furigana: string;
    vi: string;
    grammar: string;
    timestamp: string;
    autoPlay?: boolean;
};

export type UserChatMessage = {
    id: string;
    role: "user";
    text: string;
    correction?: { fixedJp: string; errorVi: string };
    timestamp: string;
};

export type ChatMessage = AiChatMessage | UserChatMessage;

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
