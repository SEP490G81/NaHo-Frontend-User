import { FormalityLevel, MarugotoLevel } from "@/types/enums/speaking.llm.enum";
import { PersonaResponse } from "@/types/responses/persona.response";
import { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";

export interface ChatMessageItem {
    id: string | number;
    sender: "AI" | "USER";
    content: string;
    contentTranslation?: string | null;
    correctedText?: string | null;
    correctionExplanation?: string | null;
    grammarNote?: string | null;
    hintForLearner?: string | null;
    pronunciationScore?: number | null;
    aiReplyAudio?: string | null;
    userRecordAudio?: string | null;
    audioBase64?: string | null;
    audioUrl?: string | null;
    suggestedReplies?: string[];
    createdAt?: string;
    isPending?: boolean;
}

export interface LiveChatroomContextType {
    sessionCode: string;
    status?: string;
    sessionDetails: SpeakingSessionResponse | null;
    personaInfo: PersonaResponse | null;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    speechSpeed: number;
    showSuggestions: boolean;
    messages: ChatMessageItem[];
    isSendingMessage: boolean;
    isEndingSession: boolean;
    setSpeechSpeed: (speed: number) => void;
    setShowSuggestions: (show: boolean) => void;
    sendTextMessage: (userMessage: string) => Promise<void>;
    sendAudioMessage: (audioBlob: Blob) => Promise<void>;
    endChatSession: () => Promise<void>;
}

export interface AudioPlayerProps {
    readonly audioBase64?: string | null;
    readonly audioUrl?: string | null;
    readonly speechSpeed?: number;
    readonly autoPlay?: boolean;
}

export interface MessageItemProps {
    readonly message: ChatMessageItem;
    readonly speechSpeed?: number;
    readonly isLatestAiMessage?: boolean;
}

export interface SessionSidebarProps {
    readonly persona?: PersonaResponse | null;
    readonly marugotoLevel: MarugotoLevel;
    readonly formalityLevel: FormalityLevel;
    readonly speechSpeed: number;
    readonly showSuggestions?: boolean;
    readonly isEndingSession?: boolean;
    readonly canEndSession?: boolean;
    readonly onSpeedChange: (speed: number) => void;
    readonly onToggleSuggestions?: (show: boolean) => void;
    readonly onEndSession?: () => void;
}

export interface SuggestedRepliesProps {
    readonly suggestions: string[];
    readonly onSelectSuggestion: (text: string) => void;
    readonly isVisible?: boolean;
    readonly onToggleVisibility?: () => void;
}

export interface ChatInputProps {
    readonly suggestedReplies?: string[];
    readonly showSuggestions?: boolean;
    readonly onSendText?: (text: string) => void;
    readonly onSendAudio?: (audioBlob: Blob) => void;
    readonly disabled?: boolean;
    readonly isSending?: boolean;
}
