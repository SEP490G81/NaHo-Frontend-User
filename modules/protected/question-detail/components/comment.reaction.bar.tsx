"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { REACTION_EMOJIS } from "@/modules/protected/comment-reaction/constants/reaction-type";
import {
    REACTION_TYPES,
    type ReactionSummary,
    type ReactionType,
} from "@/types/responses/social.response";

interface Props {
    summary: ReactionSummary | null;
    onReact: (type: ReactionType) => void;
}

/** Nút thả cảm xúc cho 1 comment + bảng chọn 6 loại (kiểu Facebook) + tổng hợp. */
export function CommentReactionBar({ summary, onReact }: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const [showPicker, setShowPicker] = useState(false);
    const mine = summary?.myReaction ?? null;

    const topTypes = REACTION_TYPES.filter(
        (tp) => (summary?.counts?.[tp] ?? 0) > 0,
    );
    const total = summary?.total ?? 0;

    const btnLabel = mine ? REACTION_EMOJIS[mine].label : t("like");
    const btnEmoji = mine ? REACTION_EMOJIS[mine].emoji : "👍";

    return (
        <div className="flex items-center gap-3 text-xs select-none">
            <div
                className="relative"
                onMouseEnter={() => setShowPicker(true)}
                onMouseLeave={() => setShowPicker(false)}
            >
                <button
                    onClick={() => onReact(mine ?? "LIKE")}
                    className={`flex cursor-pointer items-center gap-1.5 transition-colors ${
                        mine
                            ? "text-bgc-highlight font-semibold"
                            : "text-text-muted hover:text-text-contrast"
                    }`}
                >
                    <span className="text-sm">{btnEmoji}</span>
                    <span>{btnLabel}</span>
                </button>

                {showPicker && (
                    // pb-2 = "cầu hover" nối liền nút và bảng chọn (không rớt hover).
                    <div className="absolute bottom-full left-0 z-40 pb-2">
                        <div
                            className="bg-bgc-app border-bdc-primary flex items-center gap-0.5 rounded-full border px-2 py-1.5 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {REACTION_TYPES.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        onReact(type);
                                        setShowPicker(false);
                                    }}
                                    aria-label={REACTION_EMOJIS[type].label}
                                    className="group/emo relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-transform duration-150 hover:-translate-y-1.5 hover:scale-125"
                                >
                                    <span className="text-[26px] leading-none">
                                        {REACTION_EMOJIS[type].emoji}
                                    </span>
                                    <span className="bg-text-contrast text-text-pure pointer-events-none absolute -top-6 rounded-md px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap opacity-0 transition-opacity group-hover/emo:opacity-100">
                                        {REACTION_EMOJIS[type].label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {total > 0 && (
                <div className="text-text-muted flex items-center gap-1.5">
                    <div className="flex items-center -space-x-1">
                        {topTypes.slice(0, 3).map((type) => (
                            <span
                                key={type}
                                title={REACTION_EMOJIS[type].label}
                                className="bg-bgc-page inline-flex h-4.5 w-4.5 items-center justify-center rounded-full text-[11px] shadow-sm"
                            >
                                {REACTION_EMOJIS[type].emoji}
                            </span>
                        ))}
                    </div>
                    <span>{total}</span>
                </div>
            )}
        </div>
    );
}

export default CommentReactionBar;
