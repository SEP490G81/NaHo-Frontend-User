"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    createComment,
    getComments,
    toggleReaction,
} from "@/services/client/social.service";
import type {
    ReactionAction,
    ReactionType,
} from "@/types/responses/social.response";

/** Nạp cây comment của câu hỏi + các thao tác (thêm, reply, thả reaction). */
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

    const reactM = useMutation({
        mutationFn: (v: {
            commentId: number;
            reactionType: ReactionType;
            reactionAction: ReactionAction;
        }) => toggleReaction(v),
        onSuccess: invalidate,
        onError: () => toast.error(t("reactionFailed")),
    });

    return {
        comments: listQ.data?.comments ?? [],
        isLoading: listQ.isLoading,
        isError: listQ.isError,
        addComment: (content: string, parentId?: number | null) =>
            addM.mutate({ content, parentId }),
        adding: addM.isPending,
        /** Thả reaction: tự suy hành động ADDED/UPDATED/REMOVED từ trạng thái cũ. */
        react: (
            commentId: number,
            type: ReactionType,
            current: ReactionType | null,
        ) => {
            const reactionAction: ReactionAction =
                current == null
                    ? "ADDED"
                    : current === type
                      ? "REMOVED"
                      : "UPDATED";
            reactM.mutate({ commentId, reactionType: type, reactionAction });
        },
    };
}
