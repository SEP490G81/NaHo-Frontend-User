export interface VocabulariesOfObjectiveResponse {
    objectiveId: number;
    vocabularyDetailResults: VocabulariesOfObjectiveResponseVocabularyDetailResponse[];
}

export interface VocabulariesOfObjectiveResponseVocabularyDetailResponse {
    id: number;
    reading: string;
    japanese: string;
    vietnameseMeaningText: string;
    englishMeaningText: string;
}

export interface VocabQuizOption {
    id: string;
    text: string;
}

export interface VocabQuizItem {
    vocabularyId: number;
    japanese: string;
    reading: string | null;
    options: VocabQuizOption[];
    correctOptionId: string;
}

