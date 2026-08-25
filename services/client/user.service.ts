import { ApiError } from "@/libs/api.error";
import {
    ChangePasswordRequest,
    CredentialsLoginRequest,
    ForgotPasswordRequest,
    RegisterRequest,
    ResendOtpRequest,
    ResetPasswordRequest,
    UpdateUserInfoRequest,
    VerifyEmailRequest,
    VerifyForgotPasswordOtpRequest,
} from "@/types/requests/user.request";
import { ProblemDetail } from "@/types/responses/base.response";
import {
    ResetPasswordTokenResponse,
    UserResponse,
} from "@/types/responses/user.response";
import {
    clientFetch,
    clientFetchJson,
    rotateTokenClient,
} from "./client.fetch";

export async function credentialsLogin(
    request: CredentialsLoginRequest,
): Promise<void> {
    const response = await clientFetch(
        "/api/auth/login",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function register(request: RegisterRequest): Promise<void> {
    const response = await clientFetch(
        "/api/auth/register",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function verifyEmail(request: VerifyEmailRequest): Promise<void> {
    const response = await clientFetch(
        "/api/auth/verify-email",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function resendOtp(request: ResendOtpRequest): Promise<void> {
    const response = await clientFetch(
        "/api/auth/resend-otp",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function forgotPassword(
    request: ForgotPasswordRequest,
): Promise<void> {
    const response = await clientFetch(
        "/api/auth/forgot-password",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function verifyForgotPasswordOtp(
    request: VerifyForgotPasswordOtpRequest,
): Promise<ResetPasswordTokenResponse> {
    return clientFetchJson<ResetPasswordTokenResponse>(
        "/api/auth/forgot-password-otp",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
    );
}

export async function resetPassword(
    request: ResetPasswordRequest,
): Promise<void> {
    const response = await clientFetch(
        "/api/auth/reset-password",
        {
            method: "POST",
            body: JSON.stringify(request),
        },
        { autoRotate: false },
    );

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function logout(): Promise<void> {
    const response = await clientFetch("/api/auth/logout", {
        method: "POST",
    });

    if (response.status === 401) {
        return;
    }

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail?.detail || "Đăng xuất thất bại.");
    }
}

export async function logoutAll(): Promise<void> {
    const response = await clientFetch("/api/auth/logout-all", {
        method: "POST",
    });

    if (!response.ok) {
        const result = await response.json().catch(() => null);
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail || "Đăng xuất tất cả thiết bị thất bại.",
        );
    }
}

export async function getCurrentUserClient(): Promise<UserResponse | null> {
    try {
        return await clientFetchJson<UserResponse>("/api/auth/me");
    } catch {
        return null;
    }
}

export async function rotateToken(): Promise<void> {
    const ok = await rotateTokenClient();
    if (!ok) {
        throw new Error("Không thể xoay token.");
    }
}

export async function updateUserInfoClient(
    request: UpdateUserInfoRequest,
): Promise<UserResponse> {
    return clientFetchJson<UserResponse>("/api/users/info", {
        method: "PATCH",
        body: JSON.stringify(request),
    });
}

export async function uploadUserAvatarClient(
    file: File,
): Promise<UserResponse> {
    const formData = new FormData();
    formData.append("avatar", file);

    return clientFetchJson<UserResponse>("/api/users/avatar", {
        method: "PATCH",
        body: formData,
    });
}

export async function changePassword(
    request: ChangePasswordRequest,
): Promise<void> {
    await clientFetchJson<void>("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify(request),
    });
}
