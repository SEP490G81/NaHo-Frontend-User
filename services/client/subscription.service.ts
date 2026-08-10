import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    SubscriptionPlanResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";

/**
 * Lấy thông tin gói đăng ký hiện tại của user đang đăng nhập.
 */
export async function getMySubscription(): Promise<UserSubscriptionResponse | null> {
    try {
        const response = await fetch("/api/subscriptions/me", {
            method: "GET",
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            const problem = result as ProblemDetail;
            throw new Error(
                problem.detail || "Không lấy được thông tin gói dịch vụ.",
            );
        }

        const api = result as ApiResponse<UserSubscriptionResponse>;
        if (api.data) {
            const subData = api.data;
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
    const response = await fetch("/api/subscription-plans", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    let result: any;
    try {
        result = await response.json();
    } catch (e) {
        throw new Error(
            "Không thể tải danh sách gói cước, vui lòng thử lại sau.",
        );
    }

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail ||
            "Không thể tải danh sách gói cước, vui lòng thử lại sau.",
        );
    }

    const api = result as ApiResponse<SubscriptionPlanResponse[]>;
    return api.data ?? (result as SubscriptionPlanResponse[]) ?? [];
}
