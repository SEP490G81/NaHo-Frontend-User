import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiResponse } from "@/types/responses/base.response";
import { LoginResponse, UserResponse } from "@/types/responses/user.response";
import { CredentialsLoginRequest } from "@/types/requests/user.request";
import { AdapterUser } from "@auth/core/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        // lưu session trong encrypted cookie
        strategy: "jwt",
    },
    pages: {
        // nếu chưa login, next auth redirect tới /login
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            // định nghĩa với field login
            credentials: {
                usernameOrEmail: {},
                rawPassword: {},
            },
            authorize: async (credentials) => {
                const usernameOrEmail = credentials.usernameOrEmail;
                const rawPassword = credentials.rawPassword;

                if (
                    typeof usernameOrEmail !== "string" ||
                    typeof rawPassword !== "string"
                ) {
                    return null;
                }

                const request: CredentialsLoginRequest = {
                    usernameOrEmail,
                    rawPassword,
                };

                const response = await fetch(
                    `${process.env.API_URL}/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(request),
                        cache: "no-store",
                        credentials: "include",
                    },
                );

                if (!response.ok) {
                    return null;
                }

                const result: ApiResponse<LoginResponse> =
                    await response.json();

                // Dữ liệu user lúc vừa login thành công
                return {
                    details: result.data.user,
                    accessToken: result.data.accessToken,
                    // refreshToken: result.data.refreshToken,
                };
            },
        }),
    ],
    callbacks: {
        /**
         * Copy dữ liệu từ user => token
         * @param token nơi lưu auth state phía server
         * @param user
         */
        async jwt({ token, user }) {
            if (user) {
                token.user = user.details;
                token.accessToken = user.accessToken;
                // token.refreshToken = user.refreshToken;
            }
            return token;
        },

        /**
         * expose data từ JWT ra client
         * không expose token ra client
         * @param session dữ liệu an toàn expose ra frontend
         * @param token
         */
        async session({ session, token }) {
            session.user = token.user as AdapterUser & UserResponse;
            session.accessToken = token.accessToken.value;
            return session;
        },
    },
});
