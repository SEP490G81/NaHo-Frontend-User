export type ReactionType =
    | "LIKE"
    | "DISLIKE"
    | "LOVE"
    | "CARE"
    | "HAHA"
    | "WOW"
    | "SAD"
    | "ANGRY";

export interface Reaction {
    id: number;
    userId: string;
    commentId: number | null; // null if reacting to the question directly
    questionId: string;
    reactionType: ReactionType;
}
