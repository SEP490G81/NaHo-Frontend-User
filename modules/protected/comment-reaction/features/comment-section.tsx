"use client";
import React, { useState } from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCommentReactionStore } from "@/store/commentReactionStore";
import { ReactionType } from "../types/reaction";
import { REACTION_EMOJIS } from "../constants/mockData";
import ReactionPicker from "../components/reaction-picker";
import ReactionSummary from "../components/reaction-summary";
import CommentItem from "../components/comment-item";
import { Button, TextField, Avatar } from "@mui/material";
import { useTranslations } from "next-intl";

interface CommentSectionProps {
  questionId: string;
}

export function CommentSection({ questionId }: CommentSectionProps) {
  const t = useTranslations("common.commentReaction");
  const [newCommentText, setNewCommentText] = useState("");
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);

  // Zustand Store hooks
  const allComments = useCommentReactionStore((s) => s.comments);
  const allReactions = useCommentReactionStore((s) => s.reactions);
  const addComment = useCommentReactionStore((s) => s.addComment);
  const toggleReaction = useCommentReactionStore((s) => s.toggleReaction);

  // Auth User details
  const profile = useAuthStore((s) => s.profile);
  const userEmail = useAuthStore((s) => s.userEmail);
  const currentUserId = userEmail || "u01";
  const currentUserName = profile?.fullName || "Nguyễn Minh Tuấn";

  // Filter components for current question
  const questionComments = allComments.filter((c) => c.questionId === questionId);
  const questionReactions = allReactions.filter(
    (r) => r.questionId === questionId && r.commentId === null
  );

  // Check if current user reacted to the question
  const userQuestionReaction = questionReactions.find((r) => r.userId === currentUserId);

  const rootComments = questionComments.filter((c) => c.parentId === null);

  const handleAddRootComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(questionId, newCommentText, null, {
      userId: currentUserId,
      userName: currentUserName,
    });
    setNewCommentText("");
  };

  const handleAddReply = (content: string, parentId: number) => {
    addComment(questionId, content, parentId, {
      userId: currentUserId,
      userName: currentUserName,
    });
  };

  const handleToggleQuestionReaction = (type: ReactionType) => {
    toggleReaction(questionId, null, type, currentUserId);
  };

  const handleToggleCommentReaction = (commentId: number, type: ReactionType) => {
    toggleReaction(questionId, commentId, type, currentUserId);
  };

  // Styles for active question reaction button
  const questionReactionBtnText = userQuestionReaction
    ? REACTION_EMOJIS[userQuestionReaction.reactionType]?.label
    : t("likeQuestion");

  const questionReactionBtnEmoji = userQuestionReaction
    ? REACTION_EMOJIS[userQuestionReaction.reactionType]?.emoji
    : "👍";

  const questionReactionColor = userQuestionReaction
    ? "bg-bgc-highlight/15 text-bgc-highlight border-bgc-highlight/30"
    : "border-bdc-primary bg-bgc-app text-text-contrast hover:bg-hbgc-app";

  return (
    <div className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-6">
      {/* Discussion Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bdc-primary pb-4">
        <div className="flex items-center gap-2 text-text-contrast">
          <MessageSquare className="h-5 w-5 text-bgc-highlight" />
          <h3 className="text-base font-bold">{t("discussionAndInteraction")}</h3>
          <span className="bg-bgc-page text-text-muted rounded-full px-2 py-0.5 text-xs font-semibold">
            {t("commentsCount", { count: questionComments.length })}
          </span>
        </div>

        {/* Question Reaction trigger */}
        <div
          className="relative flex items-center gap-2"
          onMouseEnter={() => setShowQuestionPicker(true)}
          onMouseLeave={() => setShowQuestionPicker(false)}
        >
          <button
            onClick={() => handleToggleQuestionReaction("LIKE")}
            className={`border flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${questionReactionColor}`}
          >
            <span className="text-base">{questionReactionBtnEmoji}</span>
            <span>{questionReactionBtnText}</span>
          </button>

          {showQuestionPicker && (
            <ReactionPicker
              className="left-auto right-0"
              onSelect={(type) => {
                handleToggleQuestionReaction(type);
                setShowQuestionPicker(false);
              }}
            />
          )}

          {/* Display general reactions summary for the question */}
          <ReactionSummary reactions={questionReactions} />
        </div>
      </div>

      {/* Input box for new comment */}
      <form onSubmit={handleAddRootComment} className="flex items-start gap-3">
        <Avatar
          sx={{ width: 40, height: 40, bgcolor: "var(--color-bgc-highlight)" }}
        >
          {currentUserName.charAt(0).toUpperCase()}
        </Avatar>

        <div className="flex-1 flex flex-col gap-2">
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder={t("writeCommentPlaceholder")}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            slotProps={{
              input: {
                className: "text-sm text-text-contrast bg-bgc-page",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": { borderColor: "var(--color-bdc-primary)" },
                "&:hover fieldset": { borderColor: "var(--color-bdc-muted)" },
              },
            }}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              disabled={!newCommentText.trim()}
              sx={{
                textTransform: "none",
                bgcolor: "var(--color-bgc-highlight)",
                color: "var(--color-text-pure)",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 3,
                py: 0.75,
                "&:hover": { opacity: 0.9 },
                "&.Mui-disabled": { bgcolor: "var(--color-bdc-muted)", color: "var(--color-text-muted)" },
              }}
            >
              {t("postCommentButton")}
            </Button>
          </div>
        </div>
      </form>

      {/* Root Comments List */}
      <div className="space-y-4 pt-2">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              allComments={questionComments}
              reactions={allReactions}
              currentUserId={currentUserId}
              onAddReply={handleAddReply}
              onToggleReaction={handleToggleCommentReaction}
            />
          ))
        ) : (
          <p className="text-text-muted text-center text-sm py-4">
            {t("noCommentsYet")}
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
