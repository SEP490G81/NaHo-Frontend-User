import { FileResponse } from "@/types/responses/file.response";
import { Gender, JlptLevel } from "@/types/enums/user.enum";

export interface LoginResponse {
    user: UserResponse;
    accessToken: TokenResponse;
    refreshToken: TokenResponse;
}

export interface UserResponse {
    id: number;
    email: string;
    roles: string[];
    firstName: string;
    lastName: string;
    gender: Gender;
    dob: string;
    avatarFile: FileResponse;
    jlptLevel: JlptLevel;
}

export interface TokenResponse {
    value: string;
    expireIn: number;
}
