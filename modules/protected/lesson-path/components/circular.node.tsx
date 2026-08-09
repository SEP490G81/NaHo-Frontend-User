"use client";
import React, { useState } from "react";
import { BookOpen, Check, Lock, Mic } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import type { NodeKind, PathNode } from "../hooks/use.cando.nodes";
import SakuraDisc from "./sakura.disc";
import NodeTooltip from "./node.tooltip";

const SIZE = 76;

interface Props {
    node: PathNode;
    title: string;
    caption: string;
    /** Màu chủ đạo của quyển sách — node dùng chính màu này. */
    accent: string;
    showFurigana: boolean;
    onClick: () => void;
}

/**
 * Node tròn nổi khối trên lộ trình, tô theo MÀU SÁCH. Loại node phân biệt bằng
 * ICON (từ vựng = sách · luyện nói = mic) — GIỮ NGUYÊN cả khi đã hoàn thành, chỉ
 * gắn thêm badge tích để biết đã xong (giúp người dùng biết node nào luyện lại).
 * Rê chuột vào node luyện nói → tooltip hiện đề bài (nạp lười, cache lại).
 */
export function CircularNode({
    node,
    title,
    caption,
    accent,
    showFurigana,
    onClick,
}: Props) {
    const t = useTranslations("marugoto");
    const { status } = node;
    const locked = status === "locked";
    const completed = status === "completed";
    const kind = node.kind as Exclude<NodeKind, "chest">;
    // Node hoa anh đào luôn màu HỒNG (giống hoa trang trí của app), tách khỏi màu
    // sách; đã xong thì hồng trầm hơn, khóa thì xám (xử lý trong SakuraDisc).
    const SAKURA = "var(--color-bgc-highlight)";
    const color = completed
        ? `color-mix(in srgb, ${SAKURA} 82%, #000)`
        : SAKURA;

    const [hovered, setHovered] = useState(false);
    // Chỉ nạp đề bài khi rê vào node LUYỆN NÓI; cache dùng chung với trang chi tiết.
    const detailQ = useQuery({
        queryKey: ["learning-node", node.nodeId],
        queryFn: () => getLearningPathNodeDetail(node.nodeId),
        enabled: hovered && kind === "question" && !locked,
        staleTime: 5 * 60 * 1000,
    });
    const question = detailQ.data?.speakingQuestion;

    return (
        <div
            className="group relative z-10 flex flex-col items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {!locked && (
                <NodeTooltip>
                    <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase"
                        style={{ background: accent }}
                    >
                        {kind === "vocab" ? (
                            <BookOpen className="h-3 w-3" strokeWidth={2.5} />
                        ) : (
                            <Mic className="h-3 w-3" strokeWidth={2.5} />
                        )}
                        {title}
                    </span>
                    {kind === "question" ? (
                        detailQ.isLoading ? (
                            <p className="text-text-muted mt-1.5 text-xs">
                                {t("path.loadingQuestion")}
                            </p>
                        ) : question ? (
                            <p className="text-text-contrast mt-1.5 text-sm leading-snug font-semibold">
                                <FuriganaHtml
                                    text={question.japaneseName}
                                    markup={question.japaneseNameMarkup}
                                    showFurigana={showFurigana}
                                />
                            </p>
                        ) : (
                            <p className="text-text-muted mt-1.5 text-xs">
                                {caption}
                            </p>
                        )
                    ) : (
                        <p className="text-text-muted mt-1.5 text-xs">
                            {caption}
                        </p>
                    )}
                    {(node.bestScore ?? 0) > 0 && (
                        <p className="text-text-highlight mt-1 text-[11px] font-bold">
                            {t("preview.bestScore", {
                                score: (node.bestScore ?? 0).toFixed(1),
                            })}
                        </p>
                    )}
                    <p className="text-text-muted border-bdc-primary mt-1.5 border-t pt-1.5 text-[11px]">
                        {completed
                            ? t("path.hoverRelearn")
                            : t("path.hoverOpen")}
                    </p>
                </NodeTooltip>
            )}

            <button
                type="button"
                onClick={onClick}
                aria-label={`${title} — ${caption}`}
                className={cn(
                    "rounded-full transition-transform duration-100",
                    !locked && "cursor-pointer hover:-translate-y-1",
                    locked && "cursor-not-allowed",
                )}
            >
                <span className="relative inline-block">
                    {/* Node chỉ là hoa anh đào; icon loại node hiện ở tooltip khi
                        hover. Node khóa mới hiện ổ khóa để báo trạng thái. */}
                    <SakuraDisc color={color} locked={locked} size={SIZE}>
                        {locked ? <Lock className="h-5 w-5" /> : null}
                    </SakuraDisc>
                    {completed && !locked && (
                        <span
                            className="absolute z-20 flex items-center justify-center rounded-full"
                            style={{
                                right: 0,
                                top: SIZE - 20,
                                width: 22,
                                height: 22,
                                background:
                                    "linear-gradient(145deg, color-mix(in srgb, var(--color-text-success) 72%, #fff), var(--color-text-success))",
                                border: "2px solid #fff",
                                boxShadow:
                                    "0 2px 5px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.55)",
                            }}
                        >
                            <Check
                                className="h-3 w-3 text-white"
                                strokeWidth={3.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </span>
                    )}
                </span>
            </button>
        </div>
    );
}

export default CircularNode;
