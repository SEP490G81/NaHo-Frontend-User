"use client";
import React from "react";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import type { Lesson } from "@/data/marugoto/types";
import type { CanDoBlock } from "../hooks/use.cando.nodes";
import type { NodeStatus } from "@/components/ui/status.badge";

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

/** Màu mốc theo trạng thái: đang học = màu sách · đã xong = trầm hơn · khóa = xám. */
function toneOf(status: NodeStatus, accent: string): string {
    if (status === "locked") return "#94a3b8";
    if (status === "completed")
        return `color-mix(in srgb, ${accent} 82%, #000)`;
    return accent;
}

/** Khung tooltip hiện khi rê chuột vào mốc cờ. */
function FlagTooltip({ children }: { children: React.ReactNode }) {
    return (
        <div className="pointer-events-none absolute bottom-full z-50 mb-2 flex flex-col items-center opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="border-bdc-primary bg-bgc-app max-w-xs min-w-[200px] rounded-xl border p-3 text-center shadow-lg">
                {children}
            </div>
            <div className="border-bdc-primary bg-bgc-app -mt-1 h-2 w-2 rotate-45 border-r border-b" />
        </div>
    );
}

/**
 * Mốc cờ trên lộ trình. Cờ BÀI HỌC kẻ ca-rô (checkpoint) khác hẳn cờ CAN-DO (cờ đơn),
 * đều tô theo màu sách; khóa thì xám. Phẳng, gọn — không lạm dụng đổ bóng/gradient.
 */
export function FlagNode(props: FlagNodeProps) {
    if (props.kind === "lesson") {
        const { lesson, status, accent, showFurigana } = props;
        const tone = toneOf(status, accent);
        const dark = `color-mix(in srgb, ${tone} 70%, #000)`;
        const firstCando = lesson.canDos?.[0];

        return (
            <div className="group relative z-30 flex flex-col items-center">
                <FlagTooltip>
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
                </FlagTooltip>

                <div className="flex cursor-pointer flex-col items-center transition-transform group-hover:-translate-y-0.5">
                    {/* Cờ BÀI: kẻ ca-rô như cờ checkpoint */}
                    <svg width={62} height={54} viewBox="0 0 62 54" fill="none">
                        <rect
                            x="10"
                            y="8"
                            width="3.5"
                            height="42"
                            rx="1.5"
                            fill={dark}
                        />
                        <circle cx="11.75" cy="7" r="3.5" fill={tone} />
                        <defs>
                            <pattern
                                id={`check-${lesson.id}`}
                                width="10"
                                height="10"
                                patternUnits="userSpaceOnUse"
                            >
                                <rect width="10" height="10" fill={tone} />
                                <rect
                                    width="5"
                                    height="5"
                                    fill="#fff"
                                    opacity={0.9}
                                />
                                <rect
                                    x="5"
                                    y="5"
                                    width="5"
                                    height="5"
                                    fill="#fff"
                                    opacity={0.9}
                                />
                            </pattern>
                        </defs>
                        <rect
                            x="13.5"
                            y="9"
                            width="40"
                            height="22"
                            rx="2"
                            fill={`url(#check-${lesson.id})`}
                            stroke={dark}
                            strokeWidth={1.5}
                        />
                    </svg>
                    <div
                        className="-mt-3 rounded-full px-3 py-0.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm"
                        style={{ background: tone }}
                    >
                        Bài {lesson.order}
                    </div>
                </div>
            </div>
        );
    }

    // Cờ CAN-DO: cờ đơn nhỏ, màu sách
    const { block, accent, showFurigana } = props;
    const { cando, status, done, total } = block;
    const tone = toneOf(status, accent);
    const dark = `color-mix(in srgb, ${tone} 70%, #000)`;

    return (
        <div className="group relative z-30 flex flex-col items-center">
            <FlagTooltip>
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
            </FlagTooltip>

            <div className="flex cursor-pointer flex-col items-center transition-transform group-hover:-translate-y-0.5">
                <svg width={48} height={46} viewBox="0 0 48 46" fill="none">
                    <rect
                        x="9"
                        y="8"
                        width="3"
                        height="34"
                        rx="1.5"
                        fill={dark}
                    />
                    <circle cx="10.5" cy="7" r="3" fill={tone} />
                    {/* Cờ tam giác đơn */}
                    <path
                        d="M 12 9 L 40 15 L 12 21 Z"
                        fill={tone}
                        stroke={dark}
                        strokeWidth={1}
                        strokeLinejoin="round"
                    />
                </svg>
                <div
                    className="-mt-2.5 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-sm"
                    style={{ background: tone }}
                >
                    Can-do {cando.orderInLesson}
                </div>
            </div>
        </div>
    );
}

export default FlagNode;
