import type { ReactionType } from "../types/reaction";

export const REACTION_EMOJIS: Record<
    ReactionType,
    { emoji: string; label: string }
> = {
    LIKE: { emoji: "👍", label: "Thích" },
    DISLIKE: { emoji: "👎", label: "Không thích" },
    LOVE: { emoji: "❤️", label: "Yêu thích" },
    CARE: { emoji: "🤗", label: "Thương thương" },
    HAHA: { emoji: "😆", label: "Haha" },
    WOW: { emoji: "😮", label: "Wow" },
    SAD: { emoji: "😢", label: "Buồn" },
    ANGRY: { emoji: "😡", label: "Phẫn nộ" },
};
