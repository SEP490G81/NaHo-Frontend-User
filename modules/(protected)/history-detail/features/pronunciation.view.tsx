"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface PronunciationWord {
    word: string;
    score: number;
    feedback: string;
}

interface PronunciationViewProps {
    pronunciation: any[];
    note: string;
}

export function PronunciationView({ pronunciation, note }: PronunciationViewProps) {
    const t = useTranslations("page.historyDetail");

    const normalizedPronunciation = React.useMemo(() => {
        if (!pronunciation || !Array.isArray(pronunciation)) return [];
        return pronunciation.map((item: any) => {
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
                <h3 className="text-sm font-semibold text-text-contrast">{t("pronunciationLabel")}</h3>

                <div className="overflow-hidden rounded-xl border border-bdc-primary bg-bgc-page">
                    <table className="w-full text-sm">
                        <thead className="bg-bgc-app text-xs uppercase tracking-wide text-text-muted border-b border-bdc-primary">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">{t("pronunciationWord")}</th>
                                <th className="px-4 py-3 text-left font-semibold">{t("pronunciationScore")}</th>
                                <th className="px-4 py-3 text-left font-semibold">{t("pronunciationFeedback")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {normalizedPronunciation.map((item, i) => (
                                <tr key={i} className="border-b border-bdc-primary last:border-0 hover:bg-hbgc-app/50">
                                    <td className="px-4 py-3 align-middle font-noto-jp text-base font-semibold text-text-contrast">
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
                                                      : "bg-red-500/10 text-red-500"
                                            )}
                                        >
                                            {item.score}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle text-text-muted">
                                        {item.feedback}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-xl border border-bdc-primary bg-bgc-page p-4">
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    <AlertCircle className="h-4 w-4 text-bgc-highlight" />
                    {t("aiPronunciationNoteLabel")}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-contrast">
                    {note}
                </p>
            </div>
        </div>
    );
}

export default PronunciationView;
