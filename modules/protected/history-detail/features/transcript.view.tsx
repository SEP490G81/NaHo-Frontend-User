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
    const t = useTranslations("page.historyDetail");

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {/* User Speech */}
            <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <MessageSquare className="h-4 w-4 text-bgc-highlight" />
                    {t("yourSpeech")}
                </h3>
                <div className="rounded-xl bg-bgc-page p-4 border border-bdc-primary">
                    <p className="text-lg font-noto-jp leading-relaxed text-text-contrast">
                        {transcript.map((seg, i) =>
                            seg.error ? (
                                <Tooltip
                                    key={i}
                                    title={
                                        <Box className="space-y-1.5 p-1 text-xs">
                                            <Typography variant="caption" className="font-bold block text-red-400">
                                                {t("aiErrorLabel")} {seg.error.type}
                                            </Typography>
                                            <Typography variant="caption" className="text-white/90 block leading-normal">
                                                {seg.error.explanation}
                                            </Typography>
                                            <Typography variant="caption" className="text-white/80 block leading-normal">
                                                <span className="font-bold text-emerald-400">{t("aiSuggestionLabel")}</span> {seg.error.suggestion}
                                            </Typography>
                                        </Box>
                                    }
                                    arrow
                                    placement="top"
                                >
                                    <span
                                        className="cursor-help rounded bg-red-500/15 px-1 text-red-500 underline decoration-wavy decoration-red-500/70 underline-offset-4 font-semibold"
                                        tabIndex={0}
                                    >
                                        {seg.text}
                                    </span>
                                </Tooltip>
                            ) : (
                                <span key={i}>{seg.text}</span>
                            )
                        )}
                    </p>
                    <p className="mt-4 text-xs text-text-muted">
                        {t("aiHoverTip")}
                    </p>
                </div>
            </div>

            {/* AI Correction */}
            <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-bgc-highlight">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("aiCorrection")}
                </h3>

                <div className="space-y-3">
                    <div className="rounded-xl bg-bgc-page p-4 border border-bdc-primary space-y-2">
                        <div className="text-lg leading-relaxed">
                            <FuriganaText
                                text={aiSuggestion.jp}
                                furigana={aiSuggestion.furigana}
                                showFurigana={showFurigana}
                            />
                        </div>
                        <div className="border-t border-dashed border-bdc-primary pt-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                {t("vietnameseTranslation")}
                            </p>
                            <p className="mt-1 text-sm text-text-contrast">{aiSuggestion.vi}</p>
                        </div>
                    </div>

                    {aiSuggestion.explanation && (
                        <div className="rounded-xl bg-bgc-highlight/5 p-4 border border-bgc-highlight/10">
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-bgc-highlight">
                                {t("aiDetailedExplanation")}
                            </h4>
                            <p className="mt-2 text-sm text-text-contrast leading-relaxed">
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
