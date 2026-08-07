"use client";
import React from "react";
import { Trophy, Target, Gift } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LessonGroup } from "../hooks/use.cando.nodes";
import { FuriganaHtml } from "@/components/ui/furigana.html";

interface Props {
    groups: LessonGroup[];
    accent: string;
    showFurigana: boolean;
    currentNodeId?: string;
}

export function TopicStatsWidget({
    groups,
    accent,
    showFurigana,
    currentNodeId,
}: Props) {
    const t = useTranslations("marugoto");

    // Flatten all blocks and nodes
    const allBlocks = groups.flatMap((g) => g.blocks);
    const allNodes = allBlocks.flatMap((b) => b.nodes);
    const completedNodes = allNodes.filter((n) => n.status === "completed");
    const percent = allNodes.length
        ? Math.round((completedNodes.length / allNodes.length) * 100)
        : 0;

    // Find current active Can-Do block
    const activeBlock =
        allBlocks.find((b) => b.nodes.some((n) => n.id === currentNodeId)) ??
        allBlocks.find((b) => b.status === "active") ??
        allBlocks[0];

    return (
        <aside className="sticky top-24 space-y-4">
            {/* Progress Card */}
            <div className="border-bdc-primary/60 bg-bgc-app/95 rounded-2xl border p-4 shadow-sm backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between border-b border-bdc-primary/30 pb-2.5">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" style={{ color: accent }} />
                        <h3 className="text-text-contrast text-xs font-bold tracking-wider uppercase">
                            {t("path.topicProgress") ?? "Tiến độ chủ đề"}
                        </h3>
                    </div>
                    <span
                        className="text-xs font-extrabold"
                        style={{ color: accent }}
                    >
                        {percent}%
                    </span>
                </div>

                <div className="bg-bgc-page border-bdc-primary/20 h-3 overflow-hidden rounded-full border p-0.5 shadow-inner">
                    <div
                        className="h-full rounded-full transition-all duration-500 shadow-xs"
                        style={{
                            width: `${percent}%`,
                            background: accent,
                        }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                    <div className="bg-bgc-page/60 border-bdc-primary/30 rounded-xl border p-2">
                        <p className="text-text-muted text-[10px] font-bold uppercase">
                            {t("path.completedNodes") ?? "Đã hoàn thành"}
                        </p>
                        <p
                            className="text-sm font-extrabold mt-0.5"
                            style={{ color: accent }}
                        >
                            {completedNodes.length} / {allNodes.length}
                        </p>
                    </div>

                    <div className="bg-bgc-page/60 border-bdc-primary/30 rounded-xl border p-2">
                        <p className="text-text-muted text-[10px] font-bold uppercase">
                            {t("books.lessonCountLabel") ?? "Bài học"}
                        </p>
                        <p className="text-text-contrast text-sm font-extrabold mt-0.5">
                            {groups.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Current Active Objective Card */}
            {activeBlock && (
                <div className="border-bdc-primary/60 bg-bgc-app/95 rounded-2xl border p-4 shadow-sm backdrop-blur-md space-y-2">
                    <div className="flex items-center gap-2 border-b border-bdc-primary/30 pb-2">
                        <Target className="h-4 w-4 text-emerald-500" />
                        <h3 className="text-text-contrast text-xs font-bold tracking-wider uppercase">
                            {t("path.activeGoal") ?? "Mục tiêu hiện tại"}
                        </h3>
                    </div>

                    <p
                        className="text-[11px] font-extrabold uppercase tracking-wider"
                        style={{ color: accent }}
                    >
                        {t("path.candoLabel", {
                            index: activeBlock.cando.orderInLesson,
                        })}{" "}
                        · {activeBlock.done}/{activeBlock.total} MỐC
                    </p>

                    <div className="text-text-contrast text-xs font-bold leading-snug">
                        <FuriganaHtml
                            text={activeBlock.cando.jpDesc || activeBlock.cando.viDesc}
                            markup={activeBlock.cando.furiganaMarkup}
                            showFurigana={showFurigana}
                        />
                    </div>
                </div>
            )}

            {/* Rewards Card */}
            <div className="border-amber-400/40 bg-amber-500/5 rounded-2xl border p-4 shadow-sm backdrop-blur-md flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-500">
                    <Gift className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                        {t("path.rewardsHint") ?? "Mở rương phần thưởng"}
                    </h4>
                    <p className="text-text-muted text-[11px] font-medium leading-tight mt-0.5">
                        Hoàn thành bài học để nhận điểm L-Point hấp dẫn!
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default TopicStatsWidget;
