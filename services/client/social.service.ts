import type {
    CommentListResponse,
    ReactionToggleRequest,
} from "@/types/responses/social.response";
import { clientFetchJson } from "./client.fetch";

/** Danh sách comment (dạng cây) của một câu hỏi nói. */
export async function getComments(
    speakingQuestionId: number,
): Promise<CommentListResponse> {
    return clientFetchJson<CommentListResponse>(
        `/api/comments?speakingQuestionId=${speakingQuestionId}`,
        { cache: "no-store" },
    );
}

/** Tạo comment (hoặc reply nếu có parentId). */
export async function createComment(input: {
    speakingQuestionId: number;
    content: string;
    parentId?: number | null;
}): Promise<void> {
    await clientFetchJson<void>("/api/comments", {
        method: "POST",
        body: JSON.stringify({
            speakingQuestionId: input.speakingQuestionId,
            content: input.content,
            parentId: input.parentId ?? null,
        }),
    });
}

/** Sửa nội dung comment (BE lấy userId từ token, chỉ cần commentId + nội dung). */
export async function updateComment(input: {
    commentId: number;
    newContent: string;
}): Promise<void> {
    await clientFetchJson<void>("/api/comments", {
        method: "PUT",
        body: JSON.stringify({
            commentId: input.commentId,
            newContent: input.newContent,
        }),
    });
}

/** Xoá comment theo id. */
export async function deleteComment(commentId: number): Promise<void> {
    await clientFetchJson<void>("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
    });
}

/** Thả / đổi / gỡ reaction cho một comment. */
export async function toggleReaction(
    input: ReactionToggleRequest,
): Promise<void> {
    await clientFetchJson<void>("/api/reactions/toggle", {
        method: "POST",
        body: JSON.stringify(input),
    });
}
