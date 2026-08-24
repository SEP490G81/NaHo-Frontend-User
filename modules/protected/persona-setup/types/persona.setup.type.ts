import {
    FormalityLevel,
    MarugotoLevel,
    PersonaResponse,
} from "@/types/responses/persona.response";
import {
    UserDailyAiUsageResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";

export interface PersonaSetupContextType {
    selectedPersona: PersonaResponse | null;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    speechSpeed: number;
    showSampleAnswers: boolean;
    isStarting: boolean;
    todayUsage: UserDailyAiUsageResponse | null;
    subscription: UserSubscriptionResponse | null;
    inProgressSessionsCount: number;
    dailyLimit: number;
    dailyUsed: number;
    isDailyLimitReached: boolean;
    maxConcurrent: number;
    isConcurrentLimitReached: boolean;
    isLoadingUsage: boolean;
    planName: string;
    setSelectedPersona: (persona: PersonaResponse) => void;
    setMarugotoLevel: (level: MarugotoLevel) => void;
    setFormalityLevel: (level: FormalityLevel) => void;
    setSpeechSpeed: (speed: number) => void;
    setShowSampleAnswers: (show: boolean) => void;
    resetToDefaults: () => void;
    startChat: () => Promise<void>;
    refreshUsage: () => Promise<void>;
}

export interface PersonaCardProps {
    readonly persona: PersonaResponse;
    readonly isSelected: boolean;
    readonly onSelect: (persona: PersonaResponse) => void;
}

export interface PersonaGridProps {
    readonly personas: PersonaResponse[];
    readonly selectedPersonaId?: number | null;
    readonly onSelectPersona: (persona: PersonaResponse) => void;
}

export interface PersonaSettingsFormProps {
    readonly selectedPersona?: PersonaResponse | null;
    readonly marugotoLevel: MarugotoLevel;
    readonly formalityLevel: FormalityLevel;
    readonly speechSpeed: number;
    readonly showSampleAnswers: boolean;
    readonly onMarugotoLevelChange: (level: MarugotoLevel) => void;
    readonly onFormalityLevelChange: (level: FormalityLevel) => void;
    readonly onSpeedChange: (speed: number) => void;
    readonly onSampleAnswersChange: (show: boolean) => void;
    readonly onResetDefaults?: () => void;
}

export interface PersonaSummaryCardProps {
    readonly selectedPersona: PersonaResponse | null;
    readonly marugotoLevel: MarugotoLevel;
    readonly formalityLevel: FormalityLevel;
    readonly speechSpeed: number;
    readonly showSampleAnswers: boolean;
    readonly isStarting: boolean;
    readonly dailyLimit?: number;
    readonly dailyUsed?: number;
    readonly isDailyLimitReached?: boolean;
    readonly maxConcurrent?: number;
    readonly inProgressSessionsCount?: number;
    readonly isConcurrentLimitReached?: boolean;
    readonly planName?: string;
    readonly isLoadingUsage?: boolean;
    readonly onStartChat: () => void;
}

export interface PersonaSetupViewProps {
    readonly personas: PersonaResponse[];
}
