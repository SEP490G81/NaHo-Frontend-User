import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "learner";

export interface UserProfile {
    fullName: string;
    level: string;
    goal: string;
}

interface AuthState {
    isLoggedIn: boolean;
    role: Role;
    userEmail: string | null;
    token: string | null;
    profile: UserProfile | null;
    login: (email: string, token?: string) => void;
    setProfile: (profile: UserProfile) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            role: "learner",
            userEmail: null,
            token: null,
            profile: null,
            login: (email, token = "mock-jwt-token-naho") =>
                set({ isLoggedIn: true, userEmail: email, token }),
            setProfile: (profile) => set({ profile }),
            logout: () =>
                set({
                    isLoggedIn: false,
                    userEmail: null,
                    role: "learner",
                    token: null,
                    profile: null,
                }),
        }),
        { name: "naho-auth" },
    ),
);

export const dashboardPathForRole = (role: Role): string => {
    return "/dashboard";
};
