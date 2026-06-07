import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cache } from "react";

// cache() function use to cache the result in a request
export const getCurrentUser = cache(async (): Promise<UserResponse | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        return null;
    }

    const backendResponse = await fetch(`${process.env.API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.title);
    }

    return (result as ApiResponse<UserResponse>).data;
});
