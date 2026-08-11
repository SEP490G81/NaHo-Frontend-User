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
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    ResetPasswordTokenResponse,
    UserResponse,
} from "@/types/responses/user.response";

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
        throw new ApiError(problemDetail);
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
        throw new ApiError(problemDetail);
    }
}

export async function verifyEmail(request: VerifyEmailRequest): Promise<void> {
    const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function resendOtp(request: ResendOtpRequest): Promise<void> {
    const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function forgotPassword(
    request: ForgotPasswordRequest,
): Promise<void> {
    const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function verifyForgotPasswordOtp(
    request: VerifyForgotPasswordOtpRequest,
): Promise<ResetPasswordTokenResponse> {
    const response = await fetch("/api/auth/forgot-password-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }

    return result as ResetPasswordTokenResponse;
}

export async function resetPassword(
    request: ResetPasswordRequest,
): Promise<void> {
    const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}

export async function logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
    });

    if (response.status === 401) {
        return;
    }

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

export async function updateUserInfoClient(
    request: UpdateUserInfoRequest,
): Promise<UserResponse> {
    const response = await fetch("/api/users/info", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }

    const apiResponse = result as ApiResponse<UserResponse>;
    return apiResponse.data || (result as UserResponse);
}

export async function uploadUserAvatarClient(
    file: File,
): Promise<UserResponse> {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/users/avatar", {
        method: "PATCH",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }

    const apiResponse = result as ApiResponse<UserResponse>;
    return apiResponse.data || (result as UserResponse);
}

export async function changePassword(
    request: ChangePasswordRequest,
): Promise<void> {
    const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }
}
