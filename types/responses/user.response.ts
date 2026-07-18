import { Gender, UserStatus } from "@/types/enums/user.enum";
import { JLPTLevel } from "./book.response";
import { FileResult } from "./file.response";

export type RoleName = "LEARNER" | "CONTENT_MANAGER" | "ADMIN";
export type OAuthProviderName = "GOOGLE" | "FACEBOOK" | "APPLE";

export interface RoleResult {
    id: number;
    roleName: RoleName;
    description: string;
}

export interface OAuthProviderResult {
    id: number;
    providerName: OAuthProviderName;
    avatarUrl: string;
}

export interface LeaderboardUserResponse {
    id: number;
    leagueId: number;
    rank: number;
    username: string;
    email: string;
    fullName: string;
    avatarObjectKey: string;
    oAuthAvatarUrl: string[];
    totalPoint: number;
}

export interface OAuthProviderResponse {
    id: number;
    providerName: OAuthProviderName;
    avatarUrl: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
}

export interface RoleResponse {
    id: string;
    name: string;
    description: string;
}

export interface TokenExpResponse {
    expiresAt: string;
    expiresIn: number;
}

export interface TokenResponse {
    value: string;
    expiresAt: string;
    expiresIn: number;
}

export interface UserResponse {
    id: number;
    roles: RoleResult[];
    userSessionIds: number[];
    oAuthProviders: OAuthProviderResult[];
    userLearningProgressId: number;
    avatar: FileResult;
    username: string;
    email: string;
    fullName: string;
    gender: Gender;
    dob: string;
    jlptLevel: JLPTLevel;
    status: UserStatus;
    avatarUrl?: string;
    roleNames?: string[];
}
