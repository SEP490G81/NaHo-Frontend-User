import { getMockLeaderboardEntries, getMockUserProgress, mockLeagues } from "@/data/mockLeaderboard";
import {
    LeaderboardEntry,
    LeagueLeaderboardEntryResponse,
    LeagueResponse,
    UserLearningProgressResponse,
} from "@/types/responses/league.response";
import { resolveAvatarUrl } from "../utils/leaderboard.util";
import { clientFetchJson } from "@/services/client/client.fetch";

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
        avatarUrl: resolveAvatarUrl(entry.avatarUrl, entry.authAvatarUrl),
        point: entry.totalPoint,
    }));
}

export async function getLeagues(): Promise<LeagueResponse[]> {
    if (USE_MOCK) {
        return sortByMinPoint(mockLeagues);
    }
    const data = await clientFetchJson<LeagueResponse[]>("/api/leagues");
    return sortByMinPoint(data || []);
}

export async function getLeagueLeaderboard(
    leagueId: number,
): Promise<LeaderboardEntry[]> {
    if (USE_MOCK) {
        return getMockLeaderboardEntries(leagueId);
    }
    const raw = await clientFetchJson<LeagueLeaderboardEntryResponse[]>(
        `/api/leagues/leaderboard/${leagueId}`,
    );
    return toLeaderboardEntries(raw || []);
}

export async function getUserLearningProgress(): Promise<UserLearningProgressResponse> {
    if (USE_MOCK) {
        return getMockUserProgress();
    }
    return clientFetchJson<UserLearningProgressResponse>(
        "/api/user-learning-progresses/me",
    );
}
