import type { Question } from "@/data/mockTopics";
import type {
    BookResponse,
    CefrLevel,
    LessonDetailResponse,
    LessonListItemResponse,
    ObjectiveListItemResponse,
    SpeakingQuestionResponse,
    TopicListItemResponse,
} from "@/types/responses/book.response";
import type { BookTopic, CanDo, Lesson, MarugotoBook } from "./types";

/** Tách markup "[漢字](かな)…" thành text gốc và chuỗi đọc (reading) tương ứng. */
function splitMarkup(markup: string): { text: string; reading: string } {
    const re = /\[([^\]]+)\]\(([^)]+)\)/g;
    let text = "";
    let reading = "";
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(markup))) {
        const plain = markup.slice(last, m.index);
        text += plain + m[1];
        reading += plain + m[2];
        last = m.index + m[0].length;
    }
    const tail = markup.slice(last);
    return { text: text + tail, reading: reading + tail };
}

/** Map response Backend (danh sách sách) → model FE `MarugotoBook`. */

const CEFR_ORDER: Record<CefrLevel, number> = {
    A1: 1,
    A2: 2,
    A2B1: 3,
    B1: 4,
    B2: 5,
    C1: 6,
    C2: 7,
};
const CEFR_COLOR: Record<CefrLevel, string> = {
    A1: "#7c9cc4",
    A2: "#e59ab0",
    A2B1: "#c78fb4",
    B1: "#6fa891",
    B2: "#cf9264",
    C1: "#9384cc",
    C2: "#d76a99",
};
/** Nhãn band CEFR để nhóm & tra i18n (A2B1 → "A2/B1"). */
const CEFR_BAND: Partial<Record<CefrLevel, string>> = { A2B1: "A2/B1" };

export function mapBook(b: BookResponse): MarugotoBook {
    // Level hiển thị đúng theo band CEFR của API (A1 / A2 / A2/B1 / B1).
    const band = CEFR_BAND[b.cefrLevel] ?? b.cefrLevel;
    return {
        id: String(b.id),
        code: b.title,
        level: band,
        cefr: band,
        cefrOrder: CEFR_ORDER[b.cefrLevel] ?? 99,
        order: b.orderIndex ?? 0,
        title: b.title,
        subtitle: b.description,
        coverImage: b.coverImage?.objectKey ?? b.coverImage?.fileUrl,
        coverColor: CEFR_COLOR[b.cefrLevel],
        topics: [],
    };
}

/** Map một bài học (lesson) BE → model FE. Can-do/câu hỏi nạp riêng ở bước sau. */
export function mapBeLesson(l: LessonListItemResponse): Lesson {
    return {
        id: String(l.id),
        code: `L${l.orderIndex}`,
        order: l.orderIndex,
        jpTitle: l.japaneseName,
        furigana: l.japaneseName,
        furiganaMarkup: l.japaneseNameMarkup,
        enTitle: "",
        canDos: [],
    };
}

/** Map một chủ đề (topic) BE → model FE; truyền `lessons` nếu đã có chi tiết. */
export function mapBeTopic(
    t: TopicListItemResponse,
    lessons: Lesson[] = [],
): BookTopic {
    return {
        id: String(t.id),
        code: `T${t.orderIndex}`,
        order: t.orderIndex,
        jpTitle: t.japaneseName,
        furiganaMarkup: t.japaneseNameMarkup,
        enTitle: "",
        lessons,
    };
}

/** Map một câu hỏi luyện nói BE → model FE (furigana tách từ markup). */
export function mapBeQuestion(q: SpeakingQuestionResponse): Question {
    const { text, reading } = splitMarkup(q.titleMarkup || q.title);
    return {
        id: String(q.id),
        jp: text,
        furigana: reading,
        vi: q.description,
    };
}

/** Map một Can-do (objective) BE → model FE; BE chưa có từ vựng/ngữ pháp. */
export function mapBeObjective(
    o: ObjectiveListItemResponse,
    orderInLesson: number,
    questions: SpeakingQuestionResponse[] = [],
): CanDo {
    return {
        id: String(o.id),
        index: o.orderIndex,
        orderInLesson,
        jpDesc: o.japaneseName,
        viDesc: o.japaneseName,
        furiganaMarkup: o.japaneseNameMarkup,
        enDesc: "",
        grammar: [],
        vocabulary: [],
        questions: questions.map(mapBeQuestion),
    };
}

/** Map chi tiết bài học BE → model FE Lesson; truyền `canDos` đã dựng. */
export function mapBeLessonDetail(
    l: LessonDetailResponse,
    canDos: CanDo[],
): Lesson {
    return {
        id: String(l.id),
        code: `L${l.orderIndex}`,
        order: l.orderIndex,
        jpTitle: l.japaneseName,
        furigana: splitMarkup(l.japaneseNameMarkup || l.japaneseName).reading,
        furiganaMarkup: l.japaneseNameMarkup,
        enTitle: "",
        canDos,
    };
}
