import {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/enums/speaking.llm.enum";

export function parseListOrLines(raw?: string | null): string[] {
    if (!raw) return [];
    const trimmed = raw.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                return parsed
                    .map((item) => String(item).trim())
                    .filter(Boolean);
            }
        } catch {
            // fall through
        }
    }
    return trimmed
        .split(/\n|•|- /)
        .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
        .filter(Boolean);
}

export function formatFocusAreaLabel(area?: string | null): string {
    if (!area) return "Tổng quan";
    const lower = area.toLowerCase();
    switch (lower) {
        case "grammar":
            return "Ngữ pháp (Grammar)";
        case "vocabulary":
            return "Từ vựng (Vocabulary)";
        case "fluency":
            return "Độ trôi chảy (Fluency)";
        case "pronunciation":
            return "Phát âm (Pronunciation)";
        case "interaction":
            return "Khả năng tương tác (Interaction)";
        case "naturalness":
            return "Độ tự nhiên (Naturalness)";
        case "coherence":
            return "Tính mạch lạc (Coherence)";
        default:
            return area;
    }
}

export function getMarugotoLevelLabel(level?: MarugotoLevel | string): string {
    if (!level) return "A1 (Nhập môn)";
    switch (level) {
        case "STARTER_A1":
            return "Starter (A1)";
        case "ELEMENTARY_1_A2":
            return "Elementary 1 (A2.1)";
        case "ELEMENTARY_2_A2":
            return "Elementary 2 (A2.2)";
        case "PRE_INTERMEDIATE_A2_B1":
            return "Pre-Intermediate (A2/B1)";
        case "INTERMEDIATE_1_B1":
            return "Intermediate 1 (B1.1)";
        case "INTERMEDIATE_2_B1":
            return "Intermediate 2 (B1.2)";
        default:
            return String(level);
    }
}

export function getFormalityLevelLabel(
    level?: FormalityLevel | string,
): string {
    if (!level) return "Lịch sự";
    switch (level) {
        case "INFORMAL":
            return "Thân mật (Tự nhiên)";
        case "NEUTRAL":
            return "Lịch sự (Desu/Masu)";
        case "FORMAL":
            return "Trang trọng (Kính ngữ)";
        default:
            return String(level);
    }
}

export function getInitialLetter(name?: string): string {
    if (!name) return "P";
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase();
}

const AVATAR_COLORS = [
    "from-pink-500 to-rose-600",
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-violet-500 to-fuchsia-600",
];

export function getAvatarGradient(name?: string): string {
    if (!name) return AVATAR_COLORS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export function formatDateTime(dateString?: string | null): string {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return dateString;

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hours}:${minutes} · ${day}/${month}/${year}`;
    } catch {
        return dateString;
    }
}
