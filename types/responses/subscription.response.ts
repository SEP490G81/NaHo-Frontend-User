export type PlanTier = "FREE" | "BASIC" | "PREMIUM";

export const PLAN_TIER_LEVEL: Record<PlanTier, number> = {
    FREE: 0,
    BASIC: 1,
    PREMIUM: 2,
};

export interface SubscriptionPlanResponse {
    id: number;
    code: string;
    name: string;
    description: string;
    tier: PlanTier;
    priceAmount: number;
    priceCurrency: string;
    durationDays: number;
    monthlyAssessmentLimit: number;
    monthlyAssessmentAudioSeconds: number;
    maxAssessmentAudioSeconds: number;
    monthlyConversationSeconds: number;
    maxConversationSessionSeconds: number;
    maxConversationTurnsPerSession: number;
    fullCurriculumAccess: boolean;
    progressAnalyticsEnabled: boolean;
    sampleAnswerEnabled: boolean;
    status: string;
    createdTime?: string;
    modifiedTime?: string;
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
    plan: SubscriptionPlanResponse;
}
