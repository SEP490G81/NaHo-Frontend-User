"use client";
import React, { useState } from "react";
import type { Comment } from "../types/comment";
import type { Reaction, ReactionType } from "../types/reaction";
import { REACTION_EMOJIS } from "../constants/mockData";
import ReactionPicker from "./reaction-picker";
import ReactionSummary from "./reaction-summary";
import CommentReplyForm from "./comment-reply-form";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import { Flag } from "lucide-react";
import { useReportStore } from "@/store/reportStore";

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  reactions: Reaction[];
  currentUserId: string;
  onAddReply: (content: string, parentId: number) => void;
  onToggleReaction: (commentId: number, type: ReactionType) => void;
}

export function CommentItem({
  comment,
  allComments,
  reactions,
  currentUserId,
  onAddReply,
  onToggleReaction,
}: CommentItemProps) {
  const t = useTranslations("common.commentReaction");
  const openReportModal = useReportStore((s) => s.openModal);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const commentReactions = reactions.filter((r) => r.commentId === comment.id);
  const userReaction = commentReactions.find((r) => r.userId === currentUserId);

  const childComments = allComments.filter((c) => c.parentId === comment.id);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(replyText, comment.id);
    setReplyText("");
    setShowReplyInput(false);
  };

  const formattedTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / (60 * 1000));
      if (diffMins < 1) return t("justNow");
      if (diffMins < 60) return t("minutesAgo", { count: diffMins });
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return t("hoursAgo", { count: diffHours });
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Get active reaction color/label
  const reactionBtnText = userReaction
    ? REACTION_EMOJIS[userReaction.reactionType]?.label
    : t("like");

  const reactionBtnEmoji = userReaction
    ? REACTION_EMOJIS[userReaction.reactionType]?.emoji
    : "👍";

  const reactionBtnColor = userReaction
    ? userReaction.reactionType === "LIKE"
      ? "text-blue-500"
      : userReaction.reactionType === "LOVE"
        ? "text-red-500"
        : "text-bgc-highlight font-semibold"
    : "text-text-muted hover:text-text-contrast";

  return (
    <div className="space-y-3">
      {/* Main Comment Row */}
      <div className="flex items-start gap-3">
        <Avatar
          sx={{ width: 36, height: 36, fontSize: "0.95rem", bgcolor: "var(--color-bgc-highlight)" }}
        >
          {comment.userName.charAt(0).toUpperCase()}
        </Avatar>

        <div className="flex-1 space-y-1">
          {/* Bubble wrapper */}
          <div className="inline-block border-bdc-primary bg-bgc-page rounded-2xl border px-4 py-2 max-w-full">
            <div className="flex items-center gap-2">
              <span className="text-text-contrast text-sm font-bold">
                {comment.userName}
              </span>
              <span className="text-text-muted text-[10px]">
                {formattedTime(comment.createdAt)}
              </span>
            </div>
            <p className="text-text-contrast mt-1 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 pl-2 text-xs select-none">
            {/* Reaction Trigger Container */}
            <div
              className="relative"
              onMouseEnter={() => setShowPicker(true)}
              onMouseLeave={() => setShowPicker(false)}
            >
              <button
                onClick={() => onToggleReaction(comment.id, "LIKE")}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${reactionBtnColor}`}
              >
                <span>{reactionBtnEmoji}</span>
                <span>{reactionBtnText}</span>
              </button>

              {showPicker && (
                <ReactionPicker
                  onSelect={(type) => {
                    onToggleReaction(comment.id, type);
                    setShowPicker(false);
                  }}
                />
              )}
            </div>

            {/* Reply Button (Only allowed for root comments, parentId === null) */}
            {comment.parentId === null && (
              <button
                onClick={() => setShowReplyInput((prev) => !prev)}
                className="text-text-muted hover:text-text-contrast cursor-pointer transition-colors"
              >
                {t("reply")}
              </button>
            )}

            {/* Report Button */}
            <button
              onClick={() => openReportModal("COMMENT", comment.questionId, comment.id)}
              className="text-text-muted hover:text-red-500 cursor-pointer transition-colors flex items-center gap-1"
            >
              <Flag className="h-3 w-3" />
              <span>{t("report") || "Báo cáo"}</span>
            </button>

            {/* Reaction Summary */}
            <ReactionSummary reactions={commentReactions} />
          </div>
        </div>
      </div>

      {/* Reply Input Form */}
      {showReplyInput && (
        <CommentReplyForm
          value={replyText}
          onChange={setReplyText}
          onSubmit={handleSendReply}
          placeholder={t("writeReplyPlaceholder")}
          submitLabel={t("sendButton")}
        />
      )}

      {/* Render Nested Child Replies */}
      {childComments.length > 0 && (
        <div className="border-l-2 border-bdc-primary pl-4 ml-6 space-y-3">
          {childComments.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              allComments={allComments}
              reactions={reactions}
              currentUserId={currentUserId}
              onAddReply={onAddReply}
              onToggleReaction={onToggleReaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
