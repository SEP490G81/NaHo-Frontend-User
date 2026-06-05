import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { cookies } from "next/headers";

export async function getCurrentLoggedUser(): Promise<UserResponse> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        throw new Error("Could not find access token without access token");
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
}
