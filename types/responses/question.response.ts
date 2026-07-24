export type QuestionStatus =
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVE"
    | "REJECTED"
    | "PRIVATE"
    | "PENDING_REVIEW";

export interface SpeakingQuestionDetailResponse {
    id: number;
    userId: number;
    title: string;
    titleMarkup: string;
    description: string;
    descriptionMarkup: string;
    status: QuestionStatus;
}

export interface SpeakingQuestionListItemResponse {
    id: number;
    userId: number;
    questionAudioFileId: number;
    title: string;
    titleMarkup: string;
    description: string;
    descriptionMarkup: string;
    orderIndex: number;
    status: QuestionStatus;
    createdTime: string;
}

export interface SuggestCustomSpeakingQuestionResponse {
    questionJp: string;
}

export interface VocabulariesOfQuestionResponse {
    nodeId: number;
    vocabularyQuestionId: number;
    vocabularyDetailResults: VocabulariesOfQuestionResponseVocabularyDetailResponse[];
}

export interface VocabulariesOfQuestionResponseVocabularyDetailResponse {
    id: number;
    reading: string;
    japanese: string;
    vietnameseMeaningText: string;
    englishMeaningText: string;
}
