"use client";
import React from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip, Box, Typography } from "@mui/material";
import FuriganaText from "@/components/ui/furigana.text";
import type { TranscriptSegment } from "@/data/mockReports";

interface TranscriptViewProps {
    transcript: TranscriptSegment[];
    aiSuggestion: {
        jp: string;
        furigana: string;
        vi: string;
        explanation?: string;
    };
    showFurigana: boolean;
}

export function TranscriptView({
    transcript,
    aiSuggestion,
    showFurigana,
}: TranscriptViewProps) {
    const t = useTranslations("historyDetail");

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {/* User Speech */}
            <div className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <MessageSquare
                        className="h-4 w-4"
                        style={{ color: "var(--book-accent, var(--color-bgc-highlight))" }}
                    />
                    {t("yourSpeech")}
                </h3>
                <div className="bg-bgc-page border-bdc-primary rounded-md border p-4">
                    <p className="font-noto-jp text-text-contrast text-lg leading-relaxed">
                        {transcript.map((seg, i) =>
                            seg.error ? (
                                <Tooltip
                                    key={i}
                                    title={
                                        <Box className="space-y-1.5 p-1 text-xs">
                                            <Typography
                                                variant="caption"
                                                className="block font-bold text-red-400"
                                            >
                                                {t("aiErrorLabel")}{" "}
                                                {seg.error.type}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                className="block leading-normal text-white/90"
                                            >
                                                {seg.error.explanation}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                className="block leading-normal text-white/80"
                                            >
                                                <span className="font-bold text-emerald-400">
                                                    {t("aiSuggestionLabel")}
                                                </span>{" "}
                                                {seg.error.suggestion}
                                            </Typography>
                                        </Box>
                                    }
                                    arrow
                                    placement="top"
                                >
                                    <span
                                        className="cursor-help rounded bg-red-500/15 px-1 font-semibold text-red-500 underline decoration-red-500/70 decoration-wavy underline-offset-4"
                                        tabIndex={0}
                                    >
                                        {seg.text}
                                    </span>
                                </Tooltip>
                            ) : (
                                <span key={i}>{seg.text}</span>
                            ),
                        )}
                    </p>
                    <p className="text-text-muted mt-4 text-xs">
                        {t("aiHoverTip")}
                    </p>
                </div>
            </div>

            {/* AI Correction */}
            <div className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5">
                <h3
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--book-accent, var(--color-bgc-highlight))" }}
                >
                    <CheckCircle2 className="h-4 w-4" />
                    {t("aiCorrection")}
                </h3>

                <div className="space-y-3">
                    <div className="bg-bgc-page border-bdc-primary space-y-2 rounded-md border p-4">
                        <div className="text-lg leading-relaxed">
                            <FuriganaText
                                text={aiSuggestion.jp}
                                furigana={aiSuggestion.furigana}
                                showFurigana={showFurigana}
                            />
                        </div>
                        <div className="border-bdc-primary border-t border-dashed pt-2">
                            <p className="text-text-muted text-xs font-medium tracking-wide uppercase">
                                {t("vietnameseTranslation")}
                            </p>
                            <p className="text-text-contrast mt-1 text-sm">
                                {aiSuggestion.vi}
                            </p>
                        </div>
                    </div>

                    {aiSuggestion.explanation && (
                        <div
                            className="rounded-md border p-4"
                            style={{
                                background:
                                    "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 5%, transparent)",
                                borderColor:
                                    "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 12%, transparent)",
                            }}
                        >
                            <h4
                                className="text-xs font-semibold tracking-wide uppercase"
                                style={{ color: "var(--book-accent, var(--color-bgc-highlight))" }}
                            >
                                {t("aiDetailedExplanation")}
                            </h4>
                            <p className="text-text-contrast mt-2 text-sm leading-relaxed">
                                {aiSuggestion.explanation}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TranscriptView;
