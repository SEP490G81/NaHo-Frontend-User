"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    createComment,
    deleteComment,
    getComments,
    toggleReaction,
    updateComment
} from "@/services/client/social.service";
import type { ReactionType } from "@/types/responses/social.response";

/** Nạp cây comment của câu hỏi + thao tác (thêm, reply, sửa, xoá, thả reaction). */
export function useQuestionComments(speakingQuestionId: number | undefined) {
    const t = useTranslations("marugoto.questionDetail");
    const qc = useQueryClient();
    const key = ["comments", speakingQuestionId];

    const listQ = useQuery({
        queryKey: key,
        queryFn: () => getComments(speakingQuestionId!),
        enabled: !!speakingQuestionId,
    });

    const invalidate = () => qc.invalidateQueries({ queryKey: key });

    const addM = useMutation({
        mutationFn: (v: { content: string; parentId?: number | null }) =>
            createComment({
                speakingQuestionId: speakingQuestionId!,
                content: v.content,
                parentId: v.parentId,
            }),
        onSuccess: invalidate,
        onError: () => toast.error(t("commentFailed")),
    });

    const editM = useMutation({
        mutationFn: (v: { commentId: number; newContent: string }) =>
            updateComment(v),
        onSuccess: invalidate,
        onError: () => toast.error(t("commentFailed")),
    });

    const delM = useMutation({
        mutationFn: (commentId: number) => deleteComment(commentId),
        onSuccess: () => {
            invalidate();
            toast.success(t("commentDeleted"));
        },
        onError: () => toast.error(t("commentDeleteFailed")),
    });

    // BE tự quyết ADD/UPDATE/REMOVE nên FE chỉ gửi commentId + loại reaction.
    const reactM = useMutation({
        mutationFn: (v: { commentId: number; reactionType: ReactionType }) =>
            toggleReaction(v),
        onSuccess: invalidate,
        // Hiện lỗi thật từ BE (nếu có) để dễ chẩn đoán khi thả cảm xúc lỗi.
        onError: (e) =>
            toast.error(e instanceof Error ? e.message : t("reactionFailed")),
    });

    return {
        comments: listQ.data?.comments ?? [],
        isLoading: listQ.isLoading,
        isError: listQ.isError,
        refetch: invalidate,
        addComment: (content: string, parentId?: number | null) =>
            addM.mutate({ content, parentId }),
        adding: addM.isPending,
        editComment: (commentId: number, newContent: string) =>
            editM.mutate({ commentId, newContent }),
        removeComment: (commentId: number) => delM.mutate(commentId),
        react: (commentId: number, reactionType: ReactionType) =>
            reactM.mutate({ commentId, reactionType }),
    };
}
