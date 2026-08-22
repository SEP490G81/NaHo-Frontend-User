"use client";
import React from "react";
import { Activity, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type {
    SpeechAssessmentErrorType,
    WordAssessmentResponse,
} from "@/types/responses/speaking.response";
import { getWordAccuracyColor } from "../constants/history-detail.constant";

interface PronunciationViewProps {
    words: WordAssessmentResponse[];
    fluencyScore: number | null;
    completenessScore: number | null;
}

function noteKeyFor(errorType: SpeechAssessmentErrorType) {
    switch (errorType) {
        case "OMISSION":
            return "pronunciationNoteOmission" as const;
        case "INSERTION":
            return "pronunciationNoteInsertion" as const;
        case "MISPRONUNCIATION":
            return "pronunciationNoteMispronunciation" as const;
        default:
            return "pronunciationNoteNone" as const;
    }
}

export function PronunciationView({
    words,
    fluencyScore,
    completenessScore,
}: PronunciationViewProps) {
    const t = useTranslations("historyDetail");

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
                            {words.map((item) => {
                                const hexColor = getWordAccuracyColor(
                                    item.accuracyScore,
                                    item.errorType,
                                );
                                const noteKey = noteKeyFor(item.errorType);
                                return (
                                    <tr
                                        key={item.id}
                                        className="border-bdc-primary hover:bg-hbgc-app/50 border-b last:border-0"
                                    >
                                        <td className="font-noto-jp text-text-contrast px-4 py-3 align-middle text-base font-semibold">
                                            {item.word}
                                        </td>
                                        <td className="px-4 py-3 align-middle">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                                )}
                                                style={{
                                                    color: hexColor,
                                                    background: `color-mix(in srgb, ${hexColor} 12%, transparent)`,
                                                }}
                                            >
                                                {Math.round(
                                                    item.accuracyScore ?? 0,
                                                )}
                                                %
                                            </span>
                                        </td>
                                        <td className="text-text-muted px-4 py-3 align-middle">
                                            {t(noteKey)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <div className="border-bdc-primary bg-bgc-page flex items-center gap-3 rounded-md border p-4">
                    <Activity
                        className="h-4 w-4 shrink-0"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
                    <div>
                        <p className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                            {t("fluencyLabel")}
                        </p>
                        <p className="text-text-contrast text-lg font-bold tabular-nums">
                            {Math.round(fluencyScore ?? 0)}%
                        </p>
                    </div>
                </div>
                <div className="border-bdc-primary bg-bgc-page flex items-center gap-3 rounded-md border p-4">
                    <CheckCircle2
                        className="h-4 w-4 shrink-0"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
                    <div>
                        <p className="text-text-muted text-xs font-semibold tracking-wide uppercase">
                            {t("completenessLabel")}
                        </p>
                        <p className="text-text-contrast text-lg font-bold tabular-nums">
                            {Math.round(completenessScore ?? 0)}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PronunciationView;
