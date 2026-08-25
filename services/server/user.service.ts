import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse } from "@/types/responses/base.response";
import { cache } from "react";
import { RoleName } from "@/types/enums/user.enum";
import { fetchBackendWithAuth } from "./backend.fetch";

// cache() function use to cache the result in a request
export const getCurrentUser = cache(async (): Promise<UserResponse | null> => {
    try {
        const { response: backendResponse } =
            await fetchBackendWithAuth("/users/me");

        if (!backendResponse.ok) {
            return null;
        }

        const result = await backendResponse.json();
        const user =
            (result as ApiResponse<UserResponse>).data ??
            (result as UserResponse);

        const isRestrictedRole = user?.roles?.some((r) => {
            const roleStr = typeof r === "string" ? r : r?.roleName;
            return (
                roleStr === RoleName.ADMIN ||
                roleStr === RoleName.CONTENT_MANAGER
            );
        });

        if (isRestrictedRole) {
            return null;
        }

        return user;
    } catch {
        return null;
    }
});
