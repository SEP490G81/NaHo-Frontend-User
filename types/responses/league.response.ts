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
    username: string | null;
    email: string;
    fullName: string | null;
    avatarObjectKey: string | null;
    oAuthAvatarUrl: string[];
    totalPoint: number;
}

export interface LeaderboardUserResponse extends LeagueLeaderboardEntryResponse {
    leagueId: number;
    rank: number;
}

export interface UserLearningProgressResponse {
    id: number;
    farthestAvailableNodeId: number | null;
    lastLearningNodeId: number | null;
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
