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
            <div className="border-bdc-primary bg-bgc-app hidden overflow-hidden rounded-md border md:block">
                <table className="w-full text-sm">
                    <thead className="bg-bgc-page text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">
                                {t("tableDate")}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                {t("tableTopic")}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                {t("tableQuestion")}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                {t("tableAudio")}
                            </th>
                            <th className="px-4 py-3 text-left font-semibold">
                                {t("tableScore")}
                            </th>
                            <th className="px-4 py-3 text-right font-semibold">
                                {t("tableAction")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((entry) => {
                            const topic = mockTopics.find(
                                (t) => t.id === entry.topicId,
                            );
                            const question = topic?.questions.find(
                                (q) => q.id === entry.questionId,
                            );
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
                    const topic = mockTopics.find(
                        (t) => t.id === entry.topicId,
                    );
                    const question = topic?.questions.find(
                        (q) => q.id === entry.questionId,
                    );
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
