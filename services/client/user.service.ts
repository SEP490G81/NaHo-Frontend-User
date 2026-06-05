import { CredentialsLoginRequest } from "@/types/requests/user.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserResponse } from "@/types/responses/user.response";

export async function credentialsLogin(
    request: CredentialsLoginRequest,
): Promise<void> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}

export async function getCurrentLoggedUser(): Promise<UserResponse> {
    const response = await fetch("/api/auth/me");
    const result = await response.json();

    console.log(">>> check result: ", result);
    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }

    return (result as ApiResponse<UserResponse>).data;
}

export async function logout(): Promise<void> {
    await fetch("/api/auth/logout", {
        method: "POST",
    });
}

export async function rotateToken(): Promise<void> {}
