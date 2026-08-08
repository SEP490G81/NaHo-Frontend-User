import {
    AuthProviderName,
    Gender,
    JlptLevel,
    OAuthProviderName,
    RoleName,
    UserStatus,
} from "@/types/enums/user.enum";

export interface PointSummaryResult {
    id: number;
    totalPoint: number;
}

export interface RoleResult {
    id: number;
    roleName: RoleName;
    description: string | null;
}

export interface AuthProviderResponse {
    id: number;
    providerName: AuthProviderName | OAuthProviderName;
    avatarUrl: string | null;
}

export type OAuthProviderResult = AuthProviderResponse;
export type OAuthProviderResponse = AuthProviderResponse;

export interface RoleResponse {
    id: string;
    name: string;
    description: string | null;
}

export interface UserResponse {
    id: number;
    roles?: RoleResult[];
    userSessionIds?: number[];
    authProviders?: AuthProviderResponse[] | null;
    oAuthProviders?: AuthProviderResponse[] | null;
    pointSummary?: PointSummaryResult | null;
    userLearningProgressId: number | null;
    avatarUrl: string | null;
    username: string | null;
    email: string;
    fullName: string | null;
    gender: Gender | null;
    dob: string | null;
    jlptLevel: JlptLevel | null;
    status?: UserStatus;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
}

export interface TokenResponse {
    value: string;
    expiresAt: string;
    expiresIn: number;
}

export interface ResetPasswordTokenResponse {
    resetToken: string;
}

export interface TokenExpResponse {
    expiresAt: string;
    expiresIn: number;
}
