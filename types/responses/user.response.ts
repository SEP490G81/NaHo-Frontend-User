import { Gender, JlptLevel } from "@/types/enums/user.enum";

export interface UserResponse {
    id: number;
    email: string;
    roles: string[];
    firstName: string;
    lastName: string;
    gender: Gender;
    dob: string;
    avatarFileUrl: string;
    jlptLevel: JlptLevel;
}

export interface TokenResponse {
    value: string;
    expiresAt: string;
    expiresIn: number;
}
