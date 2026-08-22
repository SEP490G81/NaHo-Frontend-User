"use client";
import React from "react";
import { CheckCircle2, MessageSquare, Sparkles, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { AiFeedbackResponse } from "@/types/responses/speaking.response";

interface TranscriptViewProps {
    transcriptText: string;
    aiFeedback: AiFeedbackResponse;
}

export function TranscriptView({
    transcriptText,
    aiFeedback,
}: TranscriptViewProps) {
    const t = useTranslations("historyDetail");
    const errors = aiFeedback.userAnswerErrors ?? [];
    const usedExpressions = aiFeedback.usedVocabulariesAndGrammars ?? [];

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {/* User Speech */}
            <div className="space-y-4">
                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5">
                    <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                        <MessageSquare
                            className="h-4 w-4"
                            style={{
                                color: "var(--book-accent, var(--color-bgc-highlight))",
                            }}
                        />
                        {t("yourSpeech")}
                    </h3>
                    <div className="bg-bgc-page border-bdc-primary rounded-md border p-4">
                        <p className="font-noto-jp text-text-contrast text-lg leading-relaxed">
                            {transcriptText?.trim() || "—"}
                        </p>
                    </div>
                </div>

                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5">
                    <h3
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    >
                        <XCircle className="h-4 w-4" />
                        {t("userErrorsTitle")}
                    </h3>
                    {errors.length === 0 ? (
                        <p className="text-text-muted text-sm italic">
                            {t("userErrorsEmpty")}
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {errors.map((err) => (
                                <li
                                    key={err.id}
                                    className="bg-bgc-page border-bdc-primary rounded-md border p-3 text-sm"
                                >
                                    <span className="font-noto-jp text-red-500 line-through decoration-red-500/70">
                                        {err.incorrect}
                                    </span>
                                    <span className="text-text-muted mx-2">
                                        →
                                    </span>
                                    <span className="font-noto-jp text-emerald-500 font-semibold">
                                        {err.correction}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* AI Correction */}
            <div className="space-y-4">
                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5">
                    <h3
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        {t("aiCorrection")}
                    </h3>

                    <div className="bg-bgc-page border-bdc-primary space-y-2 rounded-md border p-4">
                        <div className="text-lg leading-relaxed">
                            <span className="font-noto-jp text-text-contrast">
                                {aiFeedback.suggestJapaneseAnswer || "—"}
                            </span>
                        </div>
                        {aiFeedback.suggestAnswerTranslation && (
                            <div className="border-bdc-primary border-t border-dashed pt-2">
                                <p className="text-text-muted text-xs font-medium tracking-wide uppercase">
                                    {t("vietnameseTranslation")}
                                </p>
                                <p className="text-text-contrast mt-1 text-sm">
                                    {aiFeedback.suggestAnswerTranslation}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5">
                    <h3
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    >
                        <Sparkles className="h-4 w-4" />
                        {t("usedExpressionsTitle")}
                    </h3>
                    {usedExpressions.length === 0 ? (
                        <p className="text-text-muted text-sm italic">
                            {t("usedExpressionsEmpty")}
                        </p>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {usedExpressions.map((item) => (
                                <li
                                    key={item.id}
                                    className={cn(
                                        "font-noto-jp inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm",
                                        item.category === "GRAMMAR"
                                            ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
                                    )}
                                >
                                    {item.expression}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TranscriptView;
