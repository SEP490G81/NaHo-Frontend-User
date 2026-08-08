"use client";
import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Flag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportStore } from "@/store/reportStore";
import type {
    CommentNode,
    ReactionType,
} from "@/types/responses/social.response";
import CommentInputForm from "@/modules/protected/comment-reaction/components/comment-input-form";
import CommentReactionBar from "./comment.reaction.bar";

interface Props {
    comment: CommentNode;
    currentUserName: string;
    /** Mốc thời gian "hiện tại" (ms) tính sẵn ngoài render để giữ tính thuần. */
    now: number;
    onReply: (content: string, parentId: number) => void;
    onReact: (
        commentId: number,
        type: ReactionType,
        current: ReactionType | null,
    ) => void;
}

/** Một comment + các reply lồng nhau (đệ quy). */
export function CommentThread({
    comment,
    currentUserName,
    now,
    onReply,
    onReact,
}: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const openReport = useReportStore((s) => s.openModal);
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState("");

    const author = t("commenter", { id: comment.userId });

    const relTime = (iso: string) => {
        const diff = now - new Date(iso).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return t("justNow");
        if (mins < 60) return t("minutesAgo", { count: mins });
        const hours = Math.floor(mins / 60);
        if (hours < 24) return t("hoursAgo", { count: hours });
        return new Date(iso).toLocaleDateString("vi-VN");
    };

    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        onReply(replyText, comment.commentId);
        setReplyText("");
        setShowReply(false);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-start gap-3">
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: "0.9rem",
                        bgcolor: "var(--color-bgc-highlight)",
                    }}
                >
                    {String(comment.userId).charAt(0)}
                </Avatar>

                <div className="flex-1 space-y-1">
                    <div className="border-bdc-primary bg-bgc-page inline-block max-w-full rounded-2xl border px-4 py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-text-contrast text-sm font-bold">
                                {author}
                            </span>
                            <span className="text-text-muted text-[10px]">
                                {relTime(comment.createdTime)}
                            </span>
                        </div>
                        <p className="text-text-contrast mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pl-2">
                        <CommentReactionBar
                            summary={comment.reactionSummary}
                            onReact={(type) =>
                                onReact(
                                    comment.commentId,
                                    type,
                                    comment.reactionSummary?.myReaction ?? null,
                                )
                            }
                        />
                        {comment.parentId === null && (
                            <button
                                onClick={() => setShowReply((v) => !v)}
                                className="text-text-muted hover:text-text-contrast cursor-pointer text-xs transition-colors"
                            >
                                {t("reply")}
                            </button>
                        )}
                        <button
                            onClick={() =>
                                openReport(
                                    "COMMENT",
                                    String(comment.questionId),
                                    comment.commentId,
                                )
                            }
                            className="text-text-muted flex cursor-pointer items-center gap-1 text-xs transition-colors hover:text-red-500"
                        >
                            <Flag className="h-3 w-3" />
                            {t("report")}
                        </button>
                    </div>
                </div>
            </div>

            {showReply && (
                <div className="ml-12">
                    <CommentInputForm
                        currentUserName={currentUserName}
                        value={replyText}
                        onChange={setReplyText}
                        onSubmit={sendReply}
                        placeholder={t("replyPlaceholder")}
                        submitLabel={t("send")}
                    />
                </div>
            )}

            {comment.children.length > 0 && (
                <div className="border-bdc-primary ml-6 space-y-3 border-l-2 pl-4">
                    {comment.children.map((child) => (
                        <CommentThread
                            key={child.commentId}
                            comment={child}
                            currentUserName={currentUserName}
                            now={now}
                            onReply={onReply}
                            onReact={onReact}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentThread;
