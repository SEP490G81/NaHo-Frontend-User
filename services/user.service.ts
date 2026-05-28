import { ApiResponse } from "@/types/responses/base.response";
import { LoginResponse } from "@/types/responses/user.response";
import { CredentialsLoginRequest } from "@/types/requests/user.request";

export async function credentialsLogin(
    request: CredentialsLoginRequest,
): Promise<ApiResponse<LoginResponse>> {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        cache: "no-store",
    });

    const result: ApiResponse<LoginResponse> = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}

export async function logout(): Promise<void> {
    await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
}
