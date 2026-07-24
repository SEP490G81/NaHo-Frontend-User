import type {
    BookResponse,
    CefrLevel,
    LessonDetailResponse,
    LessonListItemResponse,
    ObjectiveListItemResponse,
    TopicListItemResponse,
} from "@/types/responses/book.response";
import type { LearningPathNodeListItemResponse } from "@/types/responses/learning.response";
import type { BookTopic, CanDo, Lesson, MarugotoBook } from "./types";

/** Tách markup "[漢字](かな)…" thành text gốc và chuỗi đọc (reading) tương ứng. */
export function splitMarkup(markup: string): { text: string; reading: string } {
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
// Màu dự phòng theo band CEFR (khi thiếu orderIndex).
const CEFR_COLOR: Record<CefrLevel, string> = {
    A1: "#d23f87",
    A2: "#df7327",
    A2B1: "#5aa04a",
    B1: "#3568b0",
    B2: "#d98a3e",
    C1: "#9384cc",
    C2: "#d76a99",
};
// Màu chủ đạo bám theo bìa thật của từng quyển Marugoto Katsudoo (theo thứ tự),
// đã hạ tông một chút để chữ trắng / chữ màu vẫn nổi rõ.
const BOOK_COLOR_BY_ORDER: Record<number, string> = {
    1: "#d23f87", // A1 · hồng đậm
    2: "#df7327", // A2-1 · cam
    3: "#c99a17", // A2-2 · vàng (amber trầm)
    4: "#5aa04a", // A2/B1 · xanh lá
    5: "#3568b0", // B1-1 · xanh lam đậm
    6: "#2f8fa6", // B1-2 · xanh nước biển
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
        jlpt: b.jlptLevel,
        cefrOrder: CEFR_ORDER[b.cefrLevel] ?? 99,
        order: b.orderIndex ?? 0,
        title: b.title,
        subtitle: b.description,
        coverImage: b.coverImage?.objectKey ?? b.coverImage?.fileUrl,
        coverColor: BOOK_COLOR_BY_ORDER[b.orderIndex] ?? CEFR_COLOR[b.cefrLevel],
        firstNodeOrder: b.firstNodeGlobalOrderIndex ?? undefined,
        lastNodeOrder: b.lastNodeGlobalOrderIndex ?? undefined,
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
        firstNodeOrder: l.firstNodeGlobalOrderIndex ?? undefined,
        lastNodeOrder: l.lastNodeGlobalOrderIndex ?? undefined,
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
        firstNodeOrder: t.firstNodeGlobalOrderIndex ?? undefined,
        lastNodeOrder: t.lastNodeGlobalOrderIndex ?? undefined,
        lessons,
    };
}

const NODE_KIND: Record<string, "vocab" | "question" | "chest"> = {
    VOCABULARY_QUESTION: "vocab",
    SPEAKING_QUESTION: "question",
    CHEST: "chest",
};

/** Map một Can-do (objective) BE → model FE; node lộ trình lấy từ BE. */
export function mapBeObjective(
    o: ObjectiveListItemResponse,
    orderInLesson: number,
    nodes: LearningPathNodeListItemResponse[] = [],
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
        questions: [],
        pathNodes: [...nodes]
            .sort((a, b) => a.globalOrderIndex - b.globalOrderIndex)
            .map((n) => ({
                id: n.id,
                kind: NODE_KIND[n.nodeType] ?? "question",
                speakingQuestionId: n.speakingQuestionId ?? null,
                vocabularyQuestionId: n.vocabularyQuestionId ?? null,
                chestId: n.chestId ?? null,
                orderIndex: n.orderIndex,
                globalOrderIndex: n.globalOrderIndex,
            })),
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
        firstNodeOrder: l.firstNodeGlobalOrderIndex ?? undefined,
        lastNodeOrder: l.lastNodeGlobalOrderIndex ?? undefined,
        canDos,
    };
}
