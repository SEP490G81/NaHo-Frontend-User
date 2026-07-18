import { FileResponse } from "./file.response";
import { LearningPathNodeListItemResponse } from "./learning.response";
import { SpeakingQuestionListItemResponse } from "./question.response";

export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";
export type CefrLevel = "A1" | "A2" | "A2B1" | "B1" | "B2" | "C1" | "C2";
export type ContentStatus = string;
export type TopicStatus = "DRAFT" | "PUBLISHED" | "ARCHIVE";

export type LessonListItemResponse = LessonResponse;
export type ObjectiveListItemResponse = ObjectiveResponse;
export type SpeakingQuestionResponse = SpeakingQuestionListItemResponse;
export type TopicListItemResponse = TopicResponse;

export interface BookResponse {
    id: number;
    title: string;
    description: string;
    jlptLevel: JLPTLevel;
    cefrLevel: CefrLevel;
    orderIndex: number;
    coverImage: FileResponse;
}

export interface CreateTopicResponse {
    id: number;
    userId: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
    coverImageFileId: number;
}

export interface LessonDetailResponse {
    id: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
    objectives: ObjectiveResponse[];
}

export interface LessonResponse {
    id: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
}

export interface ObjectiveDetailResponse {
    id: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
    learningPathNodes: LearningPathNodeListItemResponse[];
    questions?: SpeakingQuestionListItemResponse[];
}

export interface ObjectiveResponse {
    id: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
}

export interface TopicDetailResponse {
    id: number;
    userId: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
    coverImageFileId: number;
    lessons: LessonResponse[];
}

export interface TopicResponse {
    id: number;
    userId: number;
    bookId: number;
    coverImageFileId: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: TopicStatus;
    orderIndex: number;
}
