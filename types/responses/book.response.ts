import { FileResponse } from "./file.response";

/** Contract Backend cho Book → Topic → Lesson. */

export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";
export type CefrLevel = "A1" | "A2" | "A2B1" | "B1" | "B2" | "C1" | "C2";
/** Trạng thái CMS của nội dung (không phải khóa/mở của học viên). */
export type ContentStatus = string;

export interface BookResponse {
    id: number;
    title: string;
    description: string;
    jlptLevel: JLPTLevel;
    cefrLevel: CefrLevel;
    orderIndex: number;
    coverImage: FileResponse | null;
}

/** Trường tiếng Nhật dùng chung cho Topic / Lesson (kèm markup furigana). */
interface JapaneseNode {
    id: number;
    japaneseName: string;
    japaneseDescription: string;
    japaneseNameMarkup: string;
    japaneseDescriptionMarkup: string;
    status: ContentStatus;
    orderIndex: number;
}

export interface TopicListItemResponse extends JapaneseNode {
    userId: number;
    bookId: number;
    coverImageFileId: number | null;
}

export type LessonListItemResponse = JapaneseNode;

export interface TopicDetailResponse extends JapaneseNode {
    userId: number;
    coverImageFileId: number | null;
    lessons: LessonListItemResponse[];
}

export type ObjectiveListItemResponse = JapaneseNode;

export interface LessonDetailResponse extends JapaneseNode {
    objectives: ObjectiveListItemResponse[];
}

export interface SpeakingQuestionResponse {
    id: number;
    userId: number;
    questionAudioFileId: number | null;
    title: string;
    titleMarkup: string;
    description: string;
    descriptionMarkup: string;
    orderIndex: number;
    status: ContentStatus;
    createdTime: string | null;
}

export interface ObjectiveDetailResponse extends JapaneseNode {
    questions: SpeakingQuestionResponse[];
}

// TODO: BE chưa có endpoint chi tiết câu hỏi kèm từ vựng/ngữ pháp
// (GET /speaking-questions/{id}). Khi team BE bổ sung, thêm lại các type
// VocabularyItemResponse / GrammarItemResponse / SpeakingQuestionDetailResponse.
