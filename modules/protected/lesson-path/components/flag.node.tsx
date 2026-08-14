"use client";
import React from "react";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import type { Lesson } from "@/data/marugoto/types";
import type { CanDoBlock } from "../hooks/use.cando.nodes";
import type { NodeStatus } from "@/components/ui/status.badge";
import NodeTooltip from "./node.tooltip";
import { KoinoboriMark, ToriiMark } from "./flag.markers";

interface LessonFlagProps {
    kind: "lesson";
    lesson: Lesson;
    status: NodeStatus;
    accent: string;
    showFurigana: boolean;
}

interface CanDoFlagProps {
    kind: "cando";
    block: CanDoBlock;
    accent: string;
    showFurigana: boolean;
}

type FlagNodeProps = LessonFlagProps | CanDoFlagProps;

/** Nền nhãn theo trạng thái/màu sách: đang học = màu sách · xong = trầm · khóa = xám. */
function toneOf(status: NodeStatus, accent: string): string {
    if (status === "locked") return "#94a3b8";
    if (status === "completed")
        return `color-mix(in srgb, ${accent} 82%, #000)`;
    return accent;
}

/**
 * Mốc trên lộ trình mang đặc trưng Nhật: cờ BÀI = cổng Torii (đỏ son nguyên bản),
 * mốc CAN-DO = đàn cá chép Koinobori (bố·mẹ·con). Icon giữ màu gốc; nhãn tô theo
 * màu sách; node khóa thì làm mờ để vẫn phân biệt trạng thái.
 */
export function FlagNode(props: FlagNodeProps) {
    if (props.kind === "lesson") {
        const { lesson, status, accent, showFurigana } = props;
        const tone = toneOf(status, accent);
        const firstCando = lesson.canDos?.[0];

        return (
            <NodeTooltip
                tip={
                    <>
                        <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
                            style={{ background: tone }}
                        >
                            Bài {lesson.order}
                        </span>
                        <h3 className="text-text-contrast mt-1.5 text-sm leading-snug font-bold">
                            <FuriganaHtml
                                text={lesson.jpTitle}
                                markup={lesson.furiganaMarkup}
                                showFurigana={showFurigana}
                            />
                        </h3>
                        {firstCando?.viDesc && (
                            <p className="text-text-muted border-bdc-primary mt-1.5 border-t pt-1.5 text-xs leading-snug">
                                {firstCando.viDesc}
                            </p>
                        )}
                    </>
                }
            >
                <div className="flex cursor-pointer flex-col items-center transition-transform group-hover:-translate-y-0.5">
                    <ToriiMark locked={status === "locked"} />
                    <div
                        className="-mt-2 rounded-full px-3 py-0.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm"
                        style={{ background: tone }}
                    >
                        Bài {lesson.order}
                    </div>
                </div>
            </NodeTooltip>
        );
    }

    // Mốc CAN-DO: đàn cá chép Koinobori
    const { block, accent, showFurigana } = props;
    const { cando, status, done, total } = block;
    const tone = toneOf(status, accent);

    return (
        <NodeTooltip
            tip={
                <>
                    <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
                        style={{ background: tone }}
                    >
                        Can-do {cando.orderInLesson} · {done}/{total}
                    </span>
                    <p className="text-text-contrast mt-1.5 text-xs leading-snug font-semibold">
                        <FuriganaHtml
                            text={cando.jpDesc || cando.viDesc}
                            markup={cando.furiganaMarkup}
                            showFurigana={showFurigana}
                        />
                    </p>
                </>
            }
        >
            <div className="flex cursor-pointer flex-col items-center transition-transform group-hover:-translate-y-0.5">
                <KoinoboriMark locked={status === "locked"} />
                <div
                    className="-mt-2.5 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-sm"
                    style={{ background: tone }}
                >
                    Can-do {cando.orderInLesson}
                </div>
            </div>
        </NodeTooltip>
    );
}

export default FlagNode;
