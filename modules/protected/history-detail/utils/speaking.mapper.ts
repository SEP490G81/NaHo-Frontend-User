import type { PronSegment, ReportDetail } from "@/data/mockReports";
import type { SpeakingReport } from "@/types/responses/speaking.response";

/** Chuẩn hoá mức độ lỗi phát âm từ BE (chuỗi tự do) về 3 mức của FE. */
function toSeverity(raw: string): PronSegment["severity"] {
    const v = (raw || "").toLowerCase();
    if (["bad", "high", "error", "severe", "wrong"].includes(v)) return "bad";
    if (["warn", "warning", "mid", "medium", "minor", "low"].includes(v)) {
        return "warn";
    }
    return "ok";
}

/** Map report BE (GET /history) → ReportDetail mà các view kết quả đang dùng. */
export function mapSpeakingReport(r: SpeakingReport): ReportDetail {
    return {
        average: r.average ?? 0,
        scores: {
            pronunciation: r.scores?.pronunciation ?? 0,
            vocabulary: r.scores?.vocabulary ?? 0,
            grammar: r.scores?.grammar ?? 0,
            naturalness: r.scores?.naturalness ?? 0,
        },
        fullTranscript: r.fullTranscript ?? "",
        userTranscript: (r.userTranscript ?? []).map((u) => ({
            text: u.text,
            error: u.error ?? undefined,
        })),
        aiSuggestion: r.aiSuggestion ?? { jp: "", furigana: "", vi: "" },
        pronunciation: (r.pronunciation ?? []).map((p) => ({
            text: p.text,
            furigana: p.furigana,
            severity: toSeverity(p.severity),
            note: p.note,
            accuracyScore: p.accuracyScore ?? null,
            colorCategory: p.colorCategory ?? null,
            hexColor: p.hexColor ?? null,
        })),
        pronunciationNote: r.pronunciationNote ?? "",
        expressions: r.expressions ?? [],
        itVocab: r.itVocab ?? [],
    };
}
