import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Comment } from "@/modules/protected/comment-reaction/types/comment";
import type { Reaction, ReactionType } from "@/modules/protected/comment-reaction/types/reaction";

import { mockComments, mockReactions } from "@/data/mockComments";

interface CommentReactionState {
  comments: Comment[];
  reactions: Reaction[];
  addComment: (
    questionId: string,
    content: string,
    parentId: number | null,
    user: { userId: string; userName: string; userAvatar?: string }
  ) => void;
  toggleReaction: (
    questionId: string,
    commentId: number | null,
    reactionType: ReactionType,
    userId: string
  ) => void;
  receiveComment: (comment: Comment) => void;
  receiveToggleReaction: (reaction: Reaction) => void;
  clear: () => void;
}

export const useCommentReactionStore = create<CommentReactionState>()(
  persist(
    (set) => ({
      comments: mockComments,
      reactions: mockReactions,
      addComment: (questionId, content, parentId, user) =>
        set((state) => {
          const newComment: Comment = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            userId: user.userId,
            userName: user.userName,
            userAvatar: user.userAvatar || "",
            questionId,
            parentId,
            content,
            createdAt: new Date().toISOString(),
          };
          return { comments: [...state.comments, newComment] };
        }),
      toggleReaction: (questionId, commentId, reactionType, userId) =>
        set((state) => {
          const existingIdx = state.reactions.findIndex(
            (r) =>
              r.questionId === questionId &&
              r.commentId === commentId &&
              r.userId === userId
          );

          let updatedReactions = [...state.reactions];

          if (existingIdx > -1) {
            const existing = state.reactions[existingIdx];
            if (existing.reactionType === reactionType) {
              // Same reaction: toggle off (remove)
              updatedReactions.splice(existingIdx, 1);
            } else {
              // Different reaction: update type
              updatedReactions[existingIdx] = {
                ...existing,
                reactionType,
              };
            }
          } else {
            // New reaction
            const newReaction: Reaction = {
              id: Date.now() + Math.floor(Math.random() * 1000),
              userId,
              commentId,
              questionId,
              reactionType,
            };
            updatedReactions.push(newReaction);
          }

          return { reactions: updatedReactions };
        }),
      receiveComment: (comment) =>
        set((state) => {
          if (state.comments.some((c) => c.id === comment.id)) {
            return {};
          }
          return { comments: [...state.comments, comment] };
        }),
      receiveToggleReaction: (reaction) =>
        set((state) => {
          const existingIdx = state.reactions.findIndex(
            (r) =>
              r.questionId === reaction.questionId &&
              r.commentId === reaction.commentId &&
              r.userId === reaction.userId
          );

          let updatedReactions = [...state.reactions];

          if (existingIdx > -1) {
            if (state.reactions[existingIdx].reactionType === reaction.reactionType) {
              updatedReactions.splice(existingIdx, 1);
            } else {
              updatedReactions[existingIdx] = reaction;
            }
          } else {
            updatedReactions.push(reaction);
          }

          return { reactions: updatedReactions };
        }),
      clear: () => set({ comments: [], reactions: [] }),
    }),
    { name: "naho-comment-reaction" }
  )
);
