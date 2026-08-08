import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import type {
    CommentListResponse,
    ReactionToggleRequest,
} from "@/types/responses/social.response";

/** Bóc envelope { data } nếu có, ngược lại trả thẳng payload. */
function unwrap<T>(result: unknown): T {
    const r = result as ApiResponse<T> & T;
    return (r?.data ?? r) as T;
}

async function readJson(response: Response): Promise<unknown> {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

function fail(result: unknown, fallback: string): never {
    const problem = result as ProblemDetail | null;
    throw new Error(problem?.detail || fallback);
}

/** Danh sách comment (dạng cây) của một câu hỏi nói. */
export async function getComments(
    speakingQuestionId: number,
): Promise<CommentListResponse> {
    const response = await fetch(
        `/api/comments?speakingQuestionId=${speakingQuestionId}`,
        { cache: "no-store" },
    );
    const result = await readJson(response);
    if (!response.ok) fail(result, "Không tải được bình luận.");
    return unwrap<CommentListResponse>(result);
}

/** Tạo comment (hoặc reply nếu có parentId). */
export async function createComment(input: {
    speakingQuestionId: number;
    content: string;
    parentId?: number | null;
}): Promise<void> {
    const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            speakingQuestionId: input.speakingQuestionId,
            content: input.content,
            parentId: input.parentId ?? null,
        }),
    });
    if (!response.ok) fail(await readJson(response), "Không gửi được bình luận.");
}

/** Sửa nội dung comment. */
export async function updateComment(input: {
    commentId: number;
    speakingQuestionId: number;
    newContent: string;
    parentId?: number | null;
}): Promise<void> {
    const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            commentId: input.commentId,
            questionId: input.speakingQuestionId,
            newContent: input.newContent,
            parentId: input.parentId ?? null,
        }),
    });
    if (!response.ok) fail(await readJson(response), "Không sửa được bình luận.");
}

/** Xoá comment theo id. */
export async function deleteComment(commentId: number): Promise<void> {
    const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
    });
    if (!response.ok) fail(await readJson(response), "Không xoá được bình luận.");
}

/** Thả / đổi / gỡ reaction cho một comment. */
export async function toggleReaction(
    input: ReactionToggleRequest,
): Promise<void> {
    const response = await fetch("/api/reactions/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!response.ok)
        fail(await readJson(response), "Không cập nhật được cảm xúc.");
}
