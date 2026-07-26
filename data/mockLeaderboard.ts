import { LeaderboardEntry, LeagueResponse, UserLearningProgressResponse } from "@/types/responses/league.response";

/** Khớp seed V4__leagues_data.sql của BE. */
export const mockLeagues: LeagueResponse[] = [
    { id: 1, name: "Bronze", minPoint: 0, maxPoint: 499 },
    { id: 2, name: "Silver", minPoint: 500, maxPoint: 1499 },
    { id: 3, name: "Gold", minPoint: 1500, maxPoint: 2999 },
    { id: 4, name: "Sapphire", minPoint: 3000, maxPoint: 5499 },
    { id: 5, name: "Ruby", minPoint: 5500, maxPoint: 8999 },
    { id: 6, name: "Emerald", minPoint: 9000, maxPoint: 13999 },
    { id: 7, name: "Amethyst", minPoint: 14000, maxPoint: 20999 },
    { id: 8, name: "Pearl", minPoint: 21000, maxPoint: 29999 },
    { id: 9, name: "Obsidian", minPoint: 30000, maxPoint: 44999 },
    { id: 10, name: "Diamond", minPoint: 45000, maxPoint: null },
].map((league) => ({ ...league, iconFile: null, description: null }));

/** Trùng id với tài khoản dev để FE nhận diện được "chính mình" khi test mock. */
const MOCK_USER_ID = 999;
const MOCK_USER_LEAGUE_ID = 1;
const MOCK_USER_POINT = 320;
const MOCK_USER_STREAK = 5;

const NAME_POOL = [
    "Bùi Quang Sáng",
    "Trần Thị Thanh An",
    "Vũ Hải Yến",
    "Trịnh Minh Châu",
    "Phạm Thu Hà",
    "Lê Quốc Hùng",
    "Hoàng Thị Mai",
    "Đỗ Nam Trân",
    "Ngô Bảo Khánh",
    "Lý Thùy Dung",
];

/**
 * Điểm tích lũy giảm dần theo thứ hạng, nằm trong dải điểm của chính hạng đó
 * (Đồng 0–499, Kim Cương 45.000+...) để bảng xếp hạng trông thật.
 */
export function getMockLeaderboardEntries(
    leagueId: number,
): LeaderboardEntry[] {
    const league =
        mockLeagues.find((item) => item.id === leagueId) ?? mockLeagues[0];
    const top = league.maxPoint ?? league.minPoint + 20000;
    const span = top - league.minPoint;
    const step = span / (NAME_POOL.length + 1);

    return NAME_POOL.map((fullName, index) => ({
        rank: index + 1,
        userId: league.id * 100 + index,
        fullName,
        avatarUrl: null,
        point: Math.round(top - step * index),
    }));
}

export function getMockUserProgress(): UserLearningProgressResponse {
    return {
        id: MOCK_USER_ID,
        farthestAvailableNodeId: 1,
        farthestAvailableNodeGlobalOrderIndex: 1,
        lastLearningNodeId: null,
        lastLearningNodeGlobalOrderIndex: null,
        lastLearningAt: null,
        currentStreak: MOCK_USER_STREAK,
        longestStreak: MOCK_USER_STREAK,
        totalPoint: MOCK_USER_POINT,
        // Hạng Đồng (leagueId 1), rank 12 -> ngoài Top 10 để demo card "vị trí của bạn".
        leaderboardUser: {
            id: MOCK_USER_ID,
            leagueId: MOCK_USER_LEAGUE_ID,
            rank: 12,
            username: "minhtuan",
            email: "minhtuan@naho.org",
            fullName: "Nguyễn Minh Tuấn",
            avatarObjectKey: null,
            oAuthAvatarUrl: [],
            totalPoint: MOCK_USER_POINT,
        },
    };
}
