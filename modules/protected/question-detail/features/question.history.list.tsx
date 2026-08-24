"use client";
import React from "react";
import { ChevronRight, History } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { getAnswerHistoriesBySpeakingQuestion } from "@/services/client/speaking.service";
import { PASS_SCORE } from "@/store/marugotoStore";

interface Props {
    speakingQuestionId: number;
    bookId: string;
    topicId: string;
    nodeId: string;
    accent: string;
}

function fmt(iso: string | null): string {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("vi-VN");
}

/** Lịch sử các lượt luyện của riêng câu hỏi này (GET /answer-histories/speaking-question/{id}). */
export function QuestionHistoryList({
    speakingQuestionId,
    bookId,
    topicId,
    nodeId,
    accent,
}: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const { data } = useQuery({
        queryKey: ["answer-histories", speakingQuestionId],
        queryFn: () => getAnswerHistoriesBySpeakingQuestion(speakingQuestionId),
    });

    if (!data || data.length === 0) return null;

    const sortedAsc = [...data].sort((a, b) => {
        const ta = a.createdTime ? new Date(a.createdTime).getTime() : a.id;
        const tb = b.createdTime ? new Date(b.createdTime).getTime() : b.id;
        return ta - tb;
    });
    const rows = sortedAsc
        .map((item, idx) => ({ item, attemptIndex: idx + 1 }))
        .reverse();

    const ctx = new URLSearchParams();
    if (nodeId) ctx.set("node", nodeId);
    if (bookId) ctx.set("book", bookId);
    if (topicId) ctx.set("topic", topicId);
    const qs = ctx.toString();

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5">
            <h3
                className="mb-3 flex items-center gap-2 text-sm font-bold"
                style={{ color: accent }}
            >
                <History className="h-4 w-4" />
                {t("historyTitle", { count: data.length })}
            </h3>
            <ul className="divide-bdc-primary divide-y">
                {rows.map(({ item, attemptIndex }) => {
                    const score = item.overallScore ?? 0;
                    const passed = score >= PASS_SCORE;
                    const practicedAt = fmt(item.createdTime);
                    return (
                        <li key={item.id}>
                            <Link
                                href={
                                    `/speaking-history/${item.id}${qs ? `?${qs}` : ""}` as AllRoute
                                }
                                className="hover:bg-hbgc-app -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors"
                            >
                                <span className="min-w-0">
                                    <span className="text-text-contrast block font-medium">
                                        {t("historyAttempt", {
                                            index: attemptIndex,
                                        })}
                                    </span>
                                    {practicedAt && (
                                        <span className="text-text-muted block text-xs">
                                            {practicedAt}
                                        </span>
                                    )}
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                    <span
                                        className={
                                            passed
                                                ? "text-text-success font-semibold"
                                                : "font-semibold text-amber-500"
                                        }
                                    >
                                        {score.toFixed(1)}/10
                                    </span>
                                    <ChevronRight className="text-text-muted h-4 w-4" />
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default QuestionHistoryList;
