"use client";

import { useQuery } from "@tanstack/react-query";
import { getMySubscription } from "@/services/client/subscription.service";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";

export function useMySubscription() {
    return useQuery<SubscriptionPlanResponse | null>({
        queryKey: ["my-subscription"],
        queryFn: getMySubscription,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
