import { QuestionStatus } from "./question.response";

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

export interface NodeVocabularyItem {
    id: number;
    reading: string | null;
    japanese: string;
    vietnameseMeaningText: string | null;
    englishMeaningText: string | null;
}

/** Ngữ pháp trên node có cùng shape với từ vựng (mẫu câu + nghĩa). */
export type NodeGrammarItem = NodeVocabularyItem;

/** Toàn bộ từ vựng của một chủ đề (GET /vocabularies/topic/{topicId}). */
export interface VocabulariesOfTopicResponse {
    topicId: number;
    vocabularies: NodeVocabularyItem[];
}

export interface LearningPathNodeDetailResponseSpeakingQuestionDetailResponse {
    id: number;
    userId: number;
    japaneseName: string;
    japaneseNameMarkup: string;
    vietnameseName: string;
    description: string;
    descriptionMarkup: string;
    japaneseSampleAnswer: string;
    japaneseSampleAnswerMarkup: string;
    vietnameseSampleAnswer: string;
    status: QuestionStatus;
    vocabularies: NodeVocabularyItem[];
    grammars: NodeGrammarItem[];
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

export type { UserLearningProgressResponse } from "./league.response";
