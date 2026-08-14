import { FileResult } from "./file.response";

export interface LeagueResponse {
    id: number;
    iconFile: FileResult | null;
    name: string;
    description: string | null;
    minPoint: number;
    maxPoint: number | null;
}

export interface LeagueLeaderboardEntryResponse {
    id: number;
    leagueId?: number;
    rank?: number;
    username: string | null;
    email: string;
    fullName: string | null;
    avatarUrl?: string | null;
    authAvatarUrl?: string[] | null;
    totalPoint: number;
}

export interface LeaderboardUserResponse extends LeagueLeaderboardEntryResponse {
    leagueId: number;
    rank: number;
}

export interface UserLearningProgressResponse {
    id: number;
    farthestAvailableNodeId: number | null;
    /** Thứ tự toàn cục của node xa nhất được mở; null khi user vừa tạo tài khoản. */
    farthestAvailableNodeGlobalOrderIndex: number | null;
    lastLearningNodeId: number | null;
    lastLearningNodeGlobalOrderIndex: number | null;
    lastLearningAt: string | null;
    currentStreak: number;
    longestStreak: number;
    totalPoint: number;
    leaderboardUser: LeaderboardUserResponse | null;
}

export interface LeaderboardEntry {
    rank: number;
    userId: number;
    fullName: string | null;
    avatarUrl: string | null;
    point: number;
}

/** Tiến độ THẬT của user tại 1 node (GET /user-node-progresses/learning-path-nodes/{id}). */
export interface UserNodeProgressResponse {
    id: number;
    learningPathNodeId: number;
    userId: number;
    bestScore: number | null;
    currentScore: number | null;
    attemptCount: number;
    lastCompletedAt: string | null;
    /** NodeStatus phía BE: "PASSED" | "FAILED" | ... */
    status: string | null;
}
