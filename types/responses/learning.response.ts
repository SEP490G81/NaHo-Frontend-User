import { QuestionStatus } from "./question.response";
import { LeaderboardUserResponse } from "./user.response";

export type NodeType = "SPEAKING_QUESTION" | "VOCABULARY_QUESTION" | "CHEST";

export interface LearningPathNodeDetailResponse {
    id: number;
    objectiveId: number;
    nodeType: NodeType;
    globalOrderIndex: number;
    orderIndex: number;
    speakingQuestion: LearningPathNodeDetailResponseSpeakingQuestionDetailResponse;
    vocabularyQuestion: LearningPathNodeDetailResponseVocabularyQuestionDetailResponse;
    chest: LearningPathNodeDetailResponseChestDetailResponse;
}

export interface LearningPathNodeDetailResponseSpeakingQuestionDetailResponse {
    id: number;
    userId: number;
    title: string;
    titleMarkup: string;
    description: string;
    descriptionMarkup: string;
    status: QuestionStatus;
}

export interface LearningPathNodeDetailResponseVocabularyQuestionDetailResponse {
    id: number;
    vocabularies: LearningPathNodeDetailResponseVocabularyQuestionDetailResponseVocabularyDetailResponse[];
}

export interface LearningPathNodeDetailResponseVocabularyQuestionDetailResponseVocabularyDetailResponse {
    id: number;
    reading: string;
    japanese: string;
    vietnameseMeaningText: string;
    englishMeaningText: string;
}

export interface LearningPathNodeDetailResponseChestDetailResponse {
    id: number;
    title: string;
    description: string;
    point: number;
}

export interface LearningPathNodeListItemResponse {
    id: number;
    objectiveId: number;
    speakingQuestionId: number;
    vocabularyQuestionId: number;
    chestId: number;
    globalOrderIndex: number;
    orderIndex: number;
    nodeType: NodeType;
}

export interface UserLearningProgressResponse {
    id: number;
    farthestAvailableNodeId: number;
    lastLearningNodeId: number;
    lastLearningAt: string;
    currentStreak: number;
    longestStreak: number;
    totalPoint: number;
    leaderboardUser: LeaderboardUserResponse;
}
