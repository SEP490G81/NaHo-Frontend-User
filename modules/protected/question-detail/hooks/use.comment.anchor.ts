"use client";
import { hashAnchorId, useHashAnchor } from "@/hooks/use.hash.anchor";

/** BE gửi targetUrl của thông báo comment dạng "<đường dẫn>#comment-<id>". */
const COMMENT_ANCHOR_PREFIX = "comment";

/** Id anchor của 1 comment trên DOM. */
export function commentAnchorId(commentId: number) {
    return hashAnchorId(COMMENT_ANCHOR_PREFIX, commentId);
}

/** Cuộn tới comment mà thông báo trỏ tới, trả về id cần nháy nền. */
export function useCommentAnchor(isReady: boolean) {
    return useHashAnchor(COMMENT_ANCHOR_PREFIX, isReady);
}
