// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";
import { TokenResponse, UserResponse } from "@/types/responses/user.response";

declare module "next-auth" {
    interface User {
        details: UserResponse;
        accessToken: TokenResponse;
        // refreshToken: TokenResponse;
    }

    interface Session {
        user: UserResponse;
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: UserResponse;
        accessToken: TokenResponse;
        // refreshToken: TokenResponse;
    }
}
