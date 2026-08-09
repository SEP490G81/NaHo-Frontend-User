"use client";
import React from "react";
import { Target } from "lucide-react";
import { useTranslations } from "next-intl";
import LeagueMiniCard from "@/modules/protected/leaderboard/components/league.mini.card";

// MOCK — BE cấp sau (nhiệm vụ theo từng chủ đề của lộ trình).
const MOCK_TOPIC_QUESTS = [
    { label: "Hoàn thành Bài 1 của chủ đề", done: 1, total: 1 },
    { label: "Đạt 8.0 ở 3 câu trong chủ đề", done: 1, total: 3 },
    { label: "Mở khóa Can-do tiếp theo", done: 0, total: 1 },
];

/** Thanh bên phải lộ trình: giải đấu tuần (data thật) + nhiệm vụ chủ đề (mock). */
export function RoadmapSideRail({ accent }: { accent: string }) {
    const t = useTranslations("marugoto.sideRail");

    return (
        <aside className="hidden w-full flex-col gap-4 self-start lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
            <LeagueMiniCard accent={accent} />

            {/* Nhiệm vụ chủ đề (MOCK) */}
            <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-4 shadow-sm">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-bold">
                    <Target className="h-4 w-4" style={{ color: accent }} />
                    {t("topicQuestsTitle")}
                </h3>
                {MOCK_TOPIC_QUESTS.map((q) => (
                    <div key={q.label} className="space-y-1">
                        <div className="text-text-muted flex justify-between text-xs">
                            <span>{q.label}</span>
                            <span className="font-semibold">
                                {q.done}/{q.total}
                            </span>
                        </div>
                        <div className="bg-bgc-page h-2 w-full overflow-hidden rounded-full">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${(q.done / q.total) * 100}%`,
                                    background:
                                        q.done >= q.total
                                            ? "var(--color-text-success)"
                                            : accent,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default RoadmapSideRail;
