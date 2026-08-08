"use client";
import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserLearningProgress } from "@/modules/protected/leaderboard/services/leaderboard.service";
import { UserLearningProgressResponse } from "@/types/responses/league.response";

interface UserLearningProgressContextType {
    progress: UserLearningProgressResponse | null;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
}

const UserLearningProgressContext = createContext<
    UserLearningProgressContextType | undefined
>(undefined);

export function UserLearningProgressProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        data: progress,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return (
        <UserLearningProgressContext.Provider
            value={{
                progress: progress ?? null,
                isLoading,
                isError,
                refetch,
            }}
        >
            {children}
        </UserLearningProgressContext.Provider>
    );
}

export function useUserLearningProgress() {
    const context = useContext(UserLearningProgressContext);
    if (!context) {
        throw new Error(
            "useUserLearningProgress must be used within a UserLearningProgressProvider",
        );
    }
    return context;
}

export default UserLearningProgressProvider;
