/** Số học viên hiển thị trong bảng xếp hạng của mỗi hạng. */
export const LEADERBOARD_TOP_SIZE = 10;

/** Slug khớp với cột `name` của bảng `leagues` bên BE (đã lowercase). */
export const LEAGUE_SLUGS = [
    "bronze",
    "silver",
    "gold",
    "sapphire",
    "ruby",
    "emerald",
    "amethyst",
    "pearl",
    "obsidian",
    "diamond",
] as const;

export type LeagueSlug = (typeof LEAGUE_SLUGS)[number];

export const FALLBACK_LEAGUE_SLUG: LeagueSlug = "bronze";

export interface LeagueTheme {
    text: string;
    border: string;
    solidBg: string;
    softBg: string;
    glow: string;
}

/**
 * Tailwind không đọc được class ghép động nên phải liệt kê class đầy đủ.
 * Token màu `--color-league-*` khai báo trong `styles/globals.css`.
 */
export const LEAGUE_THEMES: Record<LeagueSlug, LeagueTheme> = {
    bronze: {
        text: "text-league-bronze",
        border: "border-league-bronze",
        solidBg: "bg-league-bronze",
        softBg: "bg-league-bronze/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-bronze)]",
    },
    silver: {
        text: "text-league-silver",
        border: "border-league-silver",
        solidBg: "bg-league-silver",
        softBg: "bg-league-silver/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-silver)]",
    },
    gold: {
        text: "text-league-gold",
        border: "border-league-gold",
        solidBg: "bg-league-gold",
        softBg: "bg-league-gold/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-gold)]",
    },
    sapphire: {
        text: "text-league-sapphire",
        border: "border-league-sapphire",
        solidBg: "bg-league-sapphire",
        softBg: "bg-league-sapphire/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-sapphire)]",
    },
    ruby: {
        text: "text-league-ruby",
        border: "border-league-ruby",
        solidBg: "bg-league-ruby",
        softBg: "bg-league-ruby/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-ruby)]",
    },
    emerald: {
        text: "text-league-emerald",
        border: "border-league-emerald",
        solidBg: "bg-league-emerald",
        softBg: "bg-league-emerald/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-emerald)]",
    },
    amethyst: {
        text: "text-league-amethyst",
        border: "border-league-amethyst",
        solidBg: "bg-league-amethyst",
        softBg: "bg-league-amethyst/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-amethyst)]",
    },
    pearl: {
        text: "text-league-pearl",
        border: "border-league-pearl",
        solidBg: "bg-league-pearl",
        softBg: "bg-league-pearl/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-pearl)]",
    },
    obsidian: {
        text: "text-league-obsidian",
        border: "border-league-obsidian",
        solidBg: "bg-league-obsidian",
        softBg: "bg-league-obsidian/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-obsidian)]",
    },
    diamond: {
        text: "text-league-diamond",
        border: "border-league-diamond",
        solidBg: "bg-league-diamond",
        softBg: "bg-league-diamond/10",
        glow: "shadow-[0_0_60px_-16px_var(--color-league-diamond)]",
    },
};

/** Màu huy chương cho 3 vị trí đầu. Chữ dùng `league-ink` vì nền là màu cố định. */
export const MEDAL_CLASSES: Record<number, string> = {
    1: "bg-league-gold text-league-ink",
    2: "bg-league-silver text-league-ink",
    3: "bg-league-bronze text-league-ink",
};

/** Style cho bục vinh danh Top 3: viền avatar, chữ nhấn, nền bệ. */
export const PODIUM_STYLES: Record<
    number,
    { border: string; text: string; pedestal: string }
> = {
    1: {
        border: "border-league-gold",
        text: "text-league-gold",
        pedestal: "bg-league-gold/15",
    },
    2: {
        border: "border-league-silver",
        text: "text-league-silver",
        pedestal: "bg-league-silver/15",
    },
    3: {
        border: "border-league-bronze",
        text: "text-league-bronze",
        pedestal: "bg-league-bronze/15",
    },
};
