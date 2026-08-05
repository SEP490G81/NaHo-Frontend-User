import { LeagueResponse } from "@/types/responses/league.response";
import {
    FALLBACK_LEAGUE_SLUG,
    LEAGUE_SLUGS,
    LEAGUE_THEMES,
    LeagueSlug,
    LeagueTheme
} from "../constants/leaderboard.constant";

/** Avatar thật: ưu tiên object key (URL CDN của BE), rồi tới avatar OAuth. */
export function resolveAvatarUrl(
    objectKey: string | null,
    oAuthAvatarUrl: string[] | undefined,
): string | null {
    if (objectKey && /^https?:\/\//.test(objectKey)) {
        return objectKey;
    }
    const oauth = oAuthAvatarUrl?.find((url) => /^https?:\/\//.test(url));
    return oauth ?? null;
}

export function toLeagueSlug(leagueName: string): LeagueSlug {
    const slug = leagueName.trim().toLowerCase();
    return LEAGUE_SLUGS.includes(slug as LeagueSlug)
        ? (slug as LeagueSlug)
        : FALLBACK_LEAGUE_SLUG;
}

export function getLeagueTheme(leagueName: string): LeagueTheme {
    return LEAGUE_THEMES[toLeagueSlug(leagueName)];
}

/**
 * URL icon của hạng từ BE (`iconFile.objectKey`). Trả null khi BE chưa có
 * (vd chạy mock offline) để UI hiển thị placeholder màu thay vì ảnh hỏng.
 * Chỉ nhận objectKey dạng URL tuyệt đối để tránh dựng ra `src` hỏng.
 */
export function getLeagueIconSrc(league: LeagueResponse): string | null {
    const accessUrl = league.iconFile?.accessUrl;
    if (accessUrl && /^https?:\/\//.test(accessUrl)) {
        return accessUrl;
    }
    return null;
}

/** "Bùi Quang Sáng" -> "BS". Rỗng thì trả về "?" để ô avatar không vỡ layout. */
export function getInitials(fullName: string | null): string {
    const words = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return "?";
    }
    const first = words[0].charAt(0);
    const last = words[words.length - 1].charAt(0);
    return (words.length === 1 ? first : first + last).toUpperCase();
}

/**
 * Hạng của học viên suy ra từ L-Point tích lũy: hạng cao nhất mà học viên
 * đã chạm mốc `minPoint`. Nhờ vậy FE biết ngay hạng của mình để mở đúng tab
 * mặc định mà không cần gọi thêm API.
 */
export function findLeagueByTotalPoint(
    leagues: LeagueResponse[],
    totalPoint: number,
): LeagueResponse | null {
    const reached = leagues
        .filter((league) => totalPoint >= league.minPoint)
        .sort((a, b) => b.minPoint - a.minPoint);
    return reached[0] ?? null;
}

/** Hạng kế tiếp theo mốc điểm, null nếu đang ở hạng cao nhất. */
export function getNextLeague(
    leagues: LeagueResponse[],
    currentLeagueId: number,
): LeagueResponse | null {
    const sorted = [...leagues].sort((a, b) => a.minPoint - b.minPoint);
    const index = sorted.findIndex((league) => league.id === currentLeagueId);
    if (index < 0 || index === sorted.length - 1) {
        return null;
    }
    return sorted[index + 1];
}

/** Số điểm tích lũy còn thiếu để chạm mốc của hạng kế tiếp. */
export function getPointToNextLeague(
    totalPoint: number,
    nextLeague: LeagueResponse | null,
): number {
    if (!nextLeague) {
        return 0;
    }
    return Math.max(0, Math.ceil(nextLeague.minPoint - totalPoint));
}

/**
 * Tiến độ (0-100) của điểm tích lũy trong dải điểm của hạng hiện tại.
 * Hạng cao nhất không có maxPoint nên luôn coi là đã đầy.
 */
export function getLeagueProgressPercent(
    totalPoint: number,
    league: LeagueResponse,
): number {
    if (league.maxPoint === null) {
        return 100;
    }
    const span = league.maxPoint - league.minPoint;
    if (span <= 0) {
        return 100;
    }
    const earned = totalPoint - league.minPoint;
    return Math.min(100, Math.max(0, (earned / span) * 100));
}
