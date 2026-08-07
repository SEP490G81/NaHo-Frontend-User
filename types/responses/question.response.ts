export type QuestionStatus =
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVE"
    | "REJECTED"
    | "PRIVATE"
    | "PENDING_REVIEW";

export interface VocabularyDetailResponse {
    id: number;
    reading: string | null;
    japanese: string;
    vietnameseMeaningText: string | null;
    englishMeaningText: string | null;
}

export type GrammarDetailResponse = VocabularyDetailResponse;

export interface SpeakingQuestionDetailResponse {
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
    vocabularies: VocabularyDetailResponse[];
    grammars: GrammarDetailResponse[];
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
