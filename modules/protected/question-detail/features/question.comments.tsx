"use client";
import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import CommentInputForm from "@/modules/protected/comment-reaction/components/comment-input-form";
import { useQuestionComments } from "../hooks/use.question.comments";
import CommentThread from "../components/comment.thread";

interface Props {
    speakingQuestionId: number;
}

/** Khu thảo luận: bình luận (cây) + reaction, nối API BE thật. */
export function QuestionComments({ speakingQuestionId }: Props) {
    const t = useTranslations("marugoto.questionDetail");
    const profile = useAuthStore((s) => s.profile);
    const currentUserName = profile?.fullName || t("you");
    const [text, setText] = useState("");
    // "Hiện tại" cập nhật phía client (tránh Date.now() khi render & lệch SSR).
    const [now, setNow] = useState(0);
    useEffect(() => {
        const update = () => setNow(Date.now());
        const first = setTimeout(update, 0);
        const id = setInterval(update, 60000);
        return () => {
            clearTimeout(first);
            clearInterval(id);
        };
    }, []);

    const { comments, isLoading, isError, addComment, adding, react } =
        useQuestionComments(speakingQuestionId);

    const submitRoot = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || adding) return;
        addComment(text, null);
        setText("");
    };

    return (
        <section className="border-bdc-primary bg-bgc-app space-y-5 rounded-2xl border p-6 shadow-sm">
            <div className="border-bdc-primary flex items-center gap-2 border-b pb-4">
                <MessageSquare className="text-bgc-highlight h-5 w-5" />
                <h3 className="text-text-contrast text-base font-bold">
                    {t("discussion")}
                </h3>
                <span className="bg-bgc-page text-text-muted rounded-full px-2 py-0.5 text-xs font-semibold">
                    {t("commentsCount", { count: comments.length })}
                </span>
            </div>

            <CommentInputForm
                currentUserName={currentUserName}
                value={text}
                onChange={setText}
                onSubmit={submitRoot}
                placeholder={t("commentPlaceholder")}
                submitLabel={t("postComment")}
            />

            <div className="space-y-4 pt-2">
                {isLoading ? (
                    <div className="bg-bgc-page h-20 animate-pulse rounded-xl" />
                ) : isError ? (
                    <p className="py-4 text-center text-sm text-red-500">
                        {t("loadFailed")}
                    </p>
                ) : comments.length > 0 ? (
                    comments.map((c) => (
                        <CommentThread
                            key={c.commentId}
                            comment={c}
                            currentUserName={currentUserName}
                            now={now}
                            onReply={(content, parentId) =>
                                addComment(content, parentId)
                            }
                            onReact={react}
                        />
                    ))
                ) : (
                    <p className="text-text-muted py-4 text-center text-sm">
                        {t("noComments")}
                    </p>
                )}
            </div>
        </section>
    );
}

export default QuestionComments;
