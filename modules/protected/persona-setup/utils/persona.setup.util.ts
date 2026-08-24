import {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import {
    FORMALITY_LEVEL_OPTIONS,
    MARUGOTO_LEVEL_OPTIONS,
} from "../constants/persona.setup.constant";

export function getMarugotoLevelLabel(level?: MarugotoLevel): string {
    if (!level) return "A1";
    const found = MARUGOTO_LEVEL_OPTIONS.find((item) => item.value === level);
    return found ? found.label : level;
}

export function getMarugotoLevelCode(level?: MarugotoLevel): string {
    if (!level) return "A1";
    const found = MARUGOTO_LEVEL_OPTIONS.find((item) => item.value === level);
    return found ? found.levelCode : level;
}

export function getFormalityLevelLabel(level?: FormalityLevel): string {
    if (!level) return "Lịch sự";
    const found = FORMALITY_LEVEL_OPTIONS.find((item) => item.value === level);
    return found ? found.label : level;
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
