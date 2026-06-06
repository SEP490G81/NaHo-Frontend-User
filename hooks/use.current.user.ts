"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { UserResponse } from "@/types/responses/user.response";
import { getCurrentUserClient } from "@/services/client/user.service";

export function useCurrentUser() {
    return useQuery<UserResponse | null>({
        queryKey: queryKeys.auth.currentUser,
        queryFn: getCurrentUserClient,
        retry: false,
        refetchOnWindowFocus: false,
        // sau 5 phút kể từ khi fetch data thì data sẽ bị đánh dấu là stale (cũ)
        // nhưng cache vẫn còn
        staleTime: 1000 * 60 * 5,
    });
}
