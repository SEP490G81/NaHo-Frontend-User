import { Gender, JlptLevel, UserStatus } from "@/types/enums/user.enum";

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    roleNames: string[];
    fullName: string;
    gender: Gender;
    dob: string;
    avatarUrl: string;
    jlptLevel: JlptLevel;
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
