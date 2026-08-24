import { FormalityLevel, MarugotoLevel } from "@/types/enums/speaking.llm.enum";

export interface StartConversationRequest {
    personaId: number;
    formalityLevel?: FormalityLevel;
    marugotoLevel?: MarugotoLevel;
}

export interface InitFirstGreetingRequest {
    personaId?: number;
    formalityLevel?: FormalityLevel;
    marugotoLevel?: MarugotoLevel;
}

export interface ChatSessionMessageRequest {
    sessionCode: string;
    userMessage: string;
}

export interface EndSessionRequest {
    topic?: string | null;
    speechMetadata?: string | null;
    asrConfidence?: string | null;
}
