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

/** Nút thả cảm xúc cho 1 comment + bảng chọn 6 loại + tổng hợp reaction. */
export function CommentReactionBar({ summary, onReact }: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const [showPicker, setShowPicker] = useState(false);
    const mine = summary?.myReaction ?? null;

    const topTypes = REACTION_TYPES.filter((tp) => (summary?.counts?.[tp] ?? 0) > 0);
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
                    <span>{btnEmoji}</span>
                    <span>{btnLabel}</span>
                </button>

                {showPicker && (
                    <div
                        className="bg-bgc-app border-bdc-primary absolute bottom-full left-0 z-30 mb-1 flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {REACTION_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    onReact(type);
                                    setShowPicker(false);
                                }}
                                title={REACTION_EMOJIS[type].label}
                                className="flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform hover:scale-135"
                            >
                                <span className="text-xl leading-none">
                                    {REACTION_EMOJIS[type].emoji}
                                </span>
                            </button>
                        ))}
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
                                className="bg-bgc-page inline-flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] shadow-sm"
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
