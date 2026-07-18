import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse } from "@/types/responses/base.response";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cache } from "react";
import { redirect } from "next/navigation";

// cache() function use to cache the result in a request
export const getCurrentUser = cache(async (): Promise<UserResponse | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        return null;
    }

    const backendResponse = await fetch(`${process.env.API_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        redirect("/login");
    }

    return (result as ApiResponse<UserResponse>).data;
});
