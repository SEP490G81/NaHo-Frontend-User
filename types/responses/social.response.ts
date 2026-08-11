export type ReportType = "QUESTION" | "COMMENT" | "SYSTEM";

export interface ReportResponse {
    id: number;
    userId: number;
    title: string;
    description: string;
    reportType: ReportType;
    isResolved: boolean;
    questionId: number;
    commentId: number;
}

// ─── Comment / Reaction (khớp contract BE /api/v1/comments & /reactions) ───
import type { LeaderboardUserResponse } from "./league.response";

/** 6 loại cảm xúc BE hỗ trợ (đồng bộ enum ReactionType phía backend). */
export const REACTION_TYPES = [
    "LIKE",
    "LOVE",
    "HAHA",
    "WOW",
    "SAD",
    "ANGRY",
] as const;

export type ReactionType = (typeof REACTION_TYPES)[number];

/** Tổng hợp reaction đính kèm mỗi comment (BE trả sẵn trong list). */
export interface ReactionSummary {
    total: number;
    counts: Partial<Record<ReactionType, number>>;
    /** Loại reaction của chính user hiện tại (null nếu chưa thả). */
    myReaction: ReactionType | null;
}

/** Một comment dạng cây — children là các reply lồng nhau. */
export interface CommentNode {
    commentId: number;
    questionId: number;
    /** Thông tin người bình luận (tên, avatar, id) — BE trả kèm. */
    userInfo: LeaderboardUserResponse | null;
    parentId: number | null;
    content: string;
    createdTime: string;
    modifiedTime: string;
    reactionSummary: ReactionSummary | null;
    children: CommentNode[];
}

export interface CommentListResponse {
    speakingQuestionId: number;
    comments: CommentNode[];
}

/** Body toggle reaction gửi lên BE (BE tự quyết ADD/UPDATE/REMOVE). */
export interface ReactionToggleRequest {
    commentId: number;
    reactionType: ReactionType;
}
