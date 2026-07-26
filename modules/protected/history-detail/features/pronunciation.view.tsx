"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";

export interface PronunciationWord {
    word: string;
    score: number;
    feedback: string;
}

/** Dạng thô của một mục phát âm — chấp nhận cả field cũ (word/score/feedback)
 *  lẫn field đã map (text/severity/note). */
interface RawPronItem {
    word?: string;
    text?: string;
    score?: number;
    severity?: string;
    feedback?: string;
    note?: string;
}

interface PronunciationViewProps {
    pronunciation: RawPronItem[];
    note: string;
}

export function PronunciationView({
    pronunciation,
    note,
}: PronunciationViewProps) {
    const t = useTranslations("historyDetail");

    const normalizedPronunciation = React.useMemo(() => {
        if (!pronunciation || !Array.isArray(pronunciation)) return [];
        return pronunciation.map((item: RawPronItem) => {
            const word = item.word ?? item.text ?? "";
            let score = item.score;
            const feedback = item.feedback ?? item.note ?? "";

            if (score === undefined && item.severity) {
                if (item.severity === "ok") score = 90;
                else if (item.severity === "warn") score = 70;
                else score = 45;
            }

            return {
                word,
                score: score ?? 100,
                feedback,
            };
        });
    }, [pronunciation]);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-text-contrast text-sm font-semibold">
                    {t("pronunciationLabel")}
                </h3>

                <div className="border-bdc-primary bg-bgc-page overflow-hidden rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="bg-bgc-app text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">
                                    {t("pronunciationWord")}
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    {t("pronunciationScore")}
                                </th>
                                <th className="px-4 py-3 text-left font-semibold">
                                    {t("pronunciationFeedback")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {normalizedPronunciation.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-bdc-primary hover:bg-hbgc-app/50 border-b last:border-0"
                                >
                                    <td className="font-noto-jp text-text-contrast px-4 py-3 align-middle text-base font-semibold">
                                        {item.word}
                                    </td>
                                    <td className="px-4 py-3 align-middle">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                                item.score >= 80
                                                    ? "bg-green-500/10 text-green-500"
                                                    : item.score >= 60
                                                      ? "bg-orange-500/10 text-orange-500"
                                                      : "bg-red-500/10 text-red-500",
                                            )}
                                        >
                                            {item.score}%
                                        </span>
                                    </td>
                                    <td className="text-text-muted px-4 py-3 align-middle">
                                        {item.feedback}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="border-bdc-primary bg-bgc-page rounded-md border p-4">
                <h4 className="text-text-muted flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
                    <AlertCircle
                        className="h-4 w-4"
                        style={{ color: "var(--book-accent, var(--color-bgc-highlight))" }}
                    />
                    {t("aiPronunciationNoteLabel")}
                </h4>
                <p className="text-text-contrast mt-2 text-sm leading-relaxed">
                    {note}
                </p>
            </div>
        </div>
    );
}

export default PronunciationView;
