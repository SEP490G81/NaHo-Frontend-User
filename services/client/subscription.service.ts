import {
    SubscriptionPlanResponse,
    UserDailyAiUsageResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";
import { clientFetchJson } from "./client.fetch";

/** Lượt AI đã dùng hôm nay (speaking + AI 1:1). */
export async function getTodayAiUsage(): Promise<UserDailyAiUsageResponse | null> {
    try {
        const data = await clientFetchJson<UserDailyAiUsageResponse>(
            "/api/user-daily-ai-usages/today",
            { cache: "no-store" },
        );
        return data ?? null;
    } catch (error) {
        console.error("Error fetching today ai usage:", error);
        return null;
    }
}

/**
 * Lấy thông tin gói đăng ký hiện tại của user đang đăng nhập.
 */
export async function getMySubscription(): Promise<UserSubscriptionResponse | null> {
    try {
        const subData = await clientFetchJson<UserSubscriptionResponse>(
            "/api/subscriptions/me",
            {
                method: "GET",
                cache: "no-store",
            },
        );

        if (subData) {
            const planObj = subData.subscriptionPlan || subData.plan;
            return {
                ...subData,
                subscriptionPlan: planObj,
                plan: planObj,
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching my subscription:", error);
        throw error;
    }
}

/**
 * Lấy danh sách các gói dịch vụ active (FREE, BASIC, PREMIUM).
 */
export async function getSubscriptionPlans(): Promise<
    SubscriptionPlanResponse[]
> {
    const data = await clientFetchJson<SubscriptionPlanResponse[]>(
        "/api/subscription-plans",
        {
            method: "GET",
            cache: "no-store",
        },
    );
    return data ?? [];
}
