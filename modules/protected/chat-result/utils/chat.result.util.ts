export function parseListOrLines(raw?: string | null): string[] {
    if (!raw) return [];
    const trimmed = raw.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                return parsed.map((item) => String(item).trim()).filter(Boolean);
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
