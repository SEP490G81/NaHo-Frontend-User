export const getGaugeColor = (score: number) => {
    if (score >= 8.5) return "#10b981"; // Xanh lá
    if (score >= 7.0) return "#3b82f6"; // Xanh dương
    if (score >= 5.0) return "#f97316"; // Cam
    return "#ef4444"; // Đỏ
};

/** Màu theo mức chính xác phát âm (thang 0-10) — đồng bộ ngưỡng với BE (WordPronunciationResult.from, /10). */
export const getWordAccuracyColor = (
    score: number | null,
    errorType: string | null,
) => {
    const s = score ?? 0;
    if (s >= 8 && errorType !== "MISPRONUNCIATION") return "#22C55E";
    if (s >= 6 && errorType !== "MISPRONUNCIATION") return "#EAB308";
    return "#EF4444";
};
