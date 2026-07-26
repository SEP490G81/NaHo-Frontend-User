import {
    Gender,
    JlptLevel,
    OAuthProviderName,
    RoleName,
    UserStatus,
} from "@/types/enums/user.enum";
import { FileResult } from "./file.response";

export interface PointSummaryResult {
    id: number;
    totalPoint: number;
}

export interface RoleResult {
    id: number;
    roleName: RoleName;
    description: string | null;
}

export interface OAuthProviderResult {
    id: number;
    providerName: OAuthProviderName;
    avatarUrl: string | null;
}

export interface RoleResponse {
    id: string;
    name: string;
    description: string | null;
}

export interface OAuthProviderResponse {
    id: number;
    providerName: OAuthProviderName;
    avatarUrl: string | null;
}

export interface UserResponse {
    id: number;
    roles: RoleResult[];
    userSessionIds: number[];
    oAuthProviders: OAuthProviderResult[];
    pointSummary: PointSummaryResult | null;
    userLearningProgressId: number | null;
    avatar: FileResult | null;
    username: string | null;
    email: string;
    fullName: string | null;
    gender: Gender | null;
    dob: string | null;
    jlptLevel: JlptLevel | null;
    status: UserStatus;
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

export interface TokenExpResponse {
    expiresAt: string;
    expiresIn: number;
}
