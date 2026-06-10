"use client";
import React from "react";
import { mockTopics } from "@/data/mockTopics";
import { HistoryRowCard, HistoryRowDesktop } from "../features/history.row";

interface HistoryListProps {
    filtered: any[];
    t: any;
}

export function HistoryList({ filtered, t }: HistoryListProps) {
    return (
        <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-xl border border-bdc-primary bg-bgc-app md:block">
                <table className="w-full text-sm">
                    <thead className="bg-bgc-page text-xs uppercase tracking-wide text-text-muted border-b border-bdc-primary">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">{t("tableDate")}</th>
                            <th className="px-4 py-3 text-left font-semibold">{t("tableTopic")}</th>
                            <th className="px-4 py-3 text-left font-semibold">{t("tableQuestion")}</th>
                            <th className="px-4 py-3 text-left font-semibold">{t("tableAudio")}</th>
                            <th className="px-4 py-3 text-left font-semibold">{t("tableScore")}</th>
                            <th className="px-4 py-3 text-right font-semibold">{t("tableAction")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((entry) => {
                            const topic = mockTopics.find((t) => t.id === entry.topicId);
                            const question = topic?.questions.find((q) => q.id === entry.questionId);
                            return (
                                <HistoryRowDesktop
                                    key={entry.historyId}
                                    entry={entry}
                                    topic={topic}
                                    question={question}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
                {filtered.map((entry) => {
                    const topic = mockTopics.find((t) => t.id === entry.topicId);
                    const question = topic?.questions.find((q) => q.id === entry.questionId);
                    return (
                        <HistoryRowCard
                            key={entry.historyId}
                            entry={entry}
                            topic={topic}
                            question={question}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default HistoryList;
