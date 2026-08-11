export interface CredentialsLoginRequest {
    usernameOrEmail: string;
    rawPassword: string;
    deviceId: string;
}

export interface GoogleLoginRequest {
    idToken: string;
    deviceId: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface VerifyEmailRequest {
    email: string;
    otpCode: string;
}

export interface ResendOtpRequest {
    email: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyForgotPasswordOtpRequest {
    email: string;
    otpCode: string;
}

export interface ResetPasswordRequest {
    email: string;
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdateUserInfoRequest {
    username?: string;
    fullName?: string;
    gender?: string | null;
    dob?: string | null;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
