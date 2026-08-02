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
