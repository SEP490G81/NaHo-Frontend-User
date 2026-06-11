import {
    CredentialsLoginRequest,
    RegisterRequest,
} from "@/types/requests/user.request";
import { ProblemDetail } from "@/types/responses/base.response";
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

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}

export async function register(request: RegisterRequest): Promise<void> {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}

export async function logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}

export async function logoutAll(): Promise<void> {
    const response = await fetch("/api/auth/logout-all", {
        method: "POST",
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}

export async function getCurrentUserClient() {
    const response = await fetch("/api/auth/me", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        return null;
    }

    return result as UserResponse;
}

export async function rotateToken() {
    const response = await fetch("/api/auth/rotation", {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }
}
