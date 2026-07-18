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
