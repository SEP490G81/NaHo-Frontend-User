export const PlanCode = {
    FREE: "FREE",
    BASIC: "BASIC",
    PREMIUM: "PREMIUM",
} as const;

export type PlanCode = (typeof PlanCode)[keyof typeof PlanCode];

export const PlanStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export const PlanTier = {
    FREE: {
        code: "FREE",
        level: 0,
    },
    BASIC: {
        code: "BASIC",
        level: 1,
    },
    PREMIUM: {
        code: "PREMIUM",
        level: 2,
    },
} as const;

export type PlanTierCode = keyof typeof PlanTier;

// Giá trị nhận từ backend
export type PlanTier = PlanTierCode;

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus];

export interface SubscriptionPlanResponse {
    id: number;

    code: PlanCode;
    name?: string;
    description: string;

    tier: PlanTier;

    priceAmount: number;
    priceCurrency: string;

    durationDays: number | null;

    dailySpeakingQuestionEvaluationLimit: number;
    maxSpeakingQuestionRecordingSeconds: number;
    maxConcurrentAiSessionCount: number;
    maxTurnsPerAiSession: number;
    dailyAiSessionEvaluationLimit: number;
    maxAiTurnSpeakingSeconds: number;
    sampleAnswerEnabled: boolean;
    status: PlanStatus;
}

export interface UserSubscriptionResponse {
    id: number;
    userId: number;
    subscriptionPlanId: number;
    paymentOrderId?: number | null;
    status: string;
    startTime: string;
    endTime: string;
    createdTime?: string;
    modifiedTime?: string;
    subscriptionPlan?: SubscriptionPlanResponse;
    plan?: SubscriptionPlanResponse;
}
