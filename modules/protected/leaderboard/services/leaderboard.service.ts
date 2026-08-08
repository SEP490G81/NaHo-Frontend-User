import { getMockLeaderboardEntries, getMockUserProgress, mockLeagues } from "@/data/mockLeaderboard";
import {
    LeaderboardEntry,
    LeagueLeaderboardEntryResponse,
    LeagueResponse,
    UserLearningProgressResponse
} from "@/types/responses/league.response";
import { resolveAvatarUrl } from "../utils/leaderboard.util";

/**
 * Bật mock CÓ CHỦ ĐÍCH cho dev không chạy BE (đặt NEXT_PUBLIC_USE_MOCK=true).
 * Mặc định = gọi BE thật; lỗi sẽ được NÉM ra để UI hiện trạng thái lỗi thay vì
 * âm thầm hiển thị dữ liệu giả — tối kỵ với một tính năng thi đua.
 */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

function sortByMinPoint(leagues: LeagueResponse[]): LeagueResponse[] {
    return [...leagues].sort((a, b) => a.minPoint - b.minPoint);
}

/** BE trả mảng đã xếp theo điểm giảm dần nên rank = vị trí trong mảng. */
function toLeaderboardEntries(
    raw: LeagueLeaderboardEntryResponse[],
): LeaderboardEntry[] {
    return raw.map((entry, index) => ({
        rank: entry.rank ?? index + 1,
        userId: entry.id,
        fullName: entry.fullName || entry.username || entry.email || "",
        avatarUrl: resolveAvatarUrl(
            entry.avatarUrl,
            entry.authAvatarUrl,
        ),
        point: entry.totalPoint,
    }));
}

export async function getLeagues(): Promise<LeagueResponse[]> {
    if (USE_MOCK) {
        return sortByMinPoint(mockLeagues);
    }
    const response = await fetch("/api/leagues", { credentials: "include" });
    if (!response.ok) {
        throw new Error(`getLeagues failed with status ${response.status}`);
    }
    return sortByMinPoint((await response.json()) as LeagueResponse[]);
}

export async function getLeagueLeaderboard(
    leagueId: number,
): Promise<LeaderboardEntry[]> {
    if (USE_MOCK) {
        return getMockLeaderboardEntries(leagueId);
    }
    const response = await fetch(`/api/leagues/leaderboard/${leagueId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(
            `getLeagueLeaderboard failed with status ${response.status}`,
        );
    }
    const raw = (await response.json()) as LeagueLeaderboardEntryResponse[];
    return toLeaderboardEntries(raw);
}

export async function getUserLearningProgress(): Promise<UserLearningProgressResponse> {
    if (USE_MOCK) {
        return getMockUserProgress();
    }
    const response = await fetch("/api/user-learning-progresses", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(
            `getUserLearningProgress failed with status ${response.status}`,
        );
    }
    return (await response.json()) as UserLearningProgressResponse;
}
