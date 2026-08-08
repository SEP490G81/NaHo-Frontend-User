"use client";
import React from "react";
import { Award, Target, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatPoints } from "@/libs/utils";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";

// MOCK — sẽ do BE cấp (bảng xếp hạng tuần, nhiệm vụ ngày, hệ thống thành tựu).
const MOCK_BOARD = [
    { name: "Minh Anh", pts: 1280 },
    { name: "Thu Hà", pts: 1150 },
    { name: "Quốc Bảo", pts: 1090 },
];
const MOCK_RANK = 4;
const MOCK_QUESTS = [
    { label: "Luyện nói 3 câu", done: 2, total: 3 },
    { label: "Đạt 8.0 điểm một câu", done: 0, total: 1 },
    { label: "Học 5 từ vựng mới", done: 5, total: 5 },
];
const MOCK_ACHIEVEMENT = { label: "Nói 100 câu tiếng Nhật", done: 42, total: 100 };

function Bar({ percent, accent }: { percent: number; accent: string }) {
    return (
        <div className="bg-bgc-page h-2 w-full overflow-hidden rounded-full">
            <div
                className="h-full rounded-full transition-all"
                style={{
                    width: `${Math.min(100, Math.max(0, percent))}%`,
                    background: accent,
                }}
            />
        </div>
    );
}

/** Thanh bên phải lộ trình (kiểu Duolingo): xếp hạng + nhiệm vụ + thành tựu. */
export function RoadmapSideRail({ accent }: { accent: string }) {
    const t = useTranslations("marugoto.sideRail");
    const { progress } = useUserLearningProgress();
    const myPoints = formatPoints(progress?.totalPoint ?? 0);

    return (
        <aside className="hidden w-full flex-col gap-4 self-start lg:sticky lg:top-6 lg:flex">
            {/* Bảng xếp hạng tuần (top 3 mock · điểm của bạn là số thật) */}
            <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-4 shadow-sm">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-bold">
                    <Trophy className="h-4 w-4" style={{ color: accent }} />
                    {t("leaderboardTitle")}
                </h3>
                <ol className="space-y-1.5">
                    {MOCK_BOARD.map((u, i) => (
                        <li
                            key={u.name}
                            className="text-text-muted flex items-center gap-2 text-xs"
                        >
                            <span className="w-4 text-center font-bold">
                                {i + 1}
                            </span>
                            <span className="text-text-contrast flex-1 truncate">
                                {u.name}
                            </span>
                            <span className="font-semibold tabular-nums">
                                {t("points", { points: u.pts })}
                            </span>
                        </li>
                    ))}
                </ol>
                <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white"
                    style={{ background: accent }}
                >
                    <span className="w-4 text-center">{MOCK_RANK}</span>
                    <span className="flex-1">{t("yourRank")}</span>
                    <span className="tabular-nums">
                        {t("points", { points: myPoints })}
                    </span>
                </div>
            </div>

            {/* Nhiệm vụ hôm nay (MOCK) */}
            <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-4 shadow-sm">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-bold">
                    <Target className="h-4 w-4" style={{ color: accent }} />
                    {t("questsTitle")}
                </h3>
                {MOCK_QUESTS.map((q) => (
                    <div key={q.label} className="space-y-1">
                        <div className="text-text-muted flex justify-between text-xs">
                            <span>{q.label}</span>
                            <span className="font-semibold">
                                {q.done}/{q.total}
                            </span>
                        </div>
                        <Bar
                            percent={(q.done / q.total) * 100}
                            accent={
                                q.done >= q.total
                                    ? "var(--color-text-success)"
                                    : accent
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Thành tựu kế tiếp (MOCK) */}
            <div className="border-bdc-primary bg-bgc-app space-y-2 rounded-2xl border p-4 shadow-sm">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-bold">
                    <Award className="h-4 w-4" style={{ color: accent }} />
                    {t("achievementTitle")}
                </h3>
                <p className="text-text-contrast text-sm font-semibold">
                    {MOCK_ACHIEVEMENT.label}
                </p>
                <div className="text-text-muted flex justify-between text-[11px] font-semibold">
                    <span>
                        {MOCK_ACHIEVEMENT.done}/{MOCK_ACHIEVEMENT.total}
                    </span>
                </div>
                <Bar
                    percent={
                        (MOCK_ACHIEVEMENT.done / MOCK_ACHIEVEMENT.total) * 100
                    }
                    accent={accent}
                />
            </div>
        </aside>
    );
}

export default RoadmapSideRail;
