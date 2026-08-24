import type {Question} from "@/data/mockTopics";

/** Loại node trên đường lộ trình vòng tròn của một Can-do. */
export type PathNodeKind = "vocab" | "question" | "test";

/** Một từ vựng đã tách từ chuỗi "漢字 [reading] (nghĩa VI)". */
export interface Vocab {
    id: string;
    japanese: string;
    reading?: string;
    vi: string;
}

/** Một node lộ trình (từ BE) thuộc một Can-do — nguồn để dựng đường tròn. */
export interface LessonPathNodeMeta {
    /** Id của learning_path_node (dùng để gọi chi tiết node). */
    id: number;
    kind: "vocab" | "question" | "chest";
    speakingQuestionId: number | null;
    vocabularyQuestionId: number | null;
    chestId: number | null;
    orderIndex: number;
    /** Thứ tự toàn cục trong giáo trình — dùng để khóa/mở theo tiến độ BE. */
    globalOrderIndex: number;
}

/** Một mục tiêu giao tiếp (Can-do) — đơn vị nhỏ nhất chứa câu hỏi luyện nói. */
export interface CanDo {
    id: string;
    /** Số thứ tự Can-do toàn cục trong sách (1..N). */
    index: number;
    orderInLesson: number;
    jpDesc: string;
    viDesc: string;
    /** Markup furigana của mô tả Can-do (BE); ưu tiên khi render nếu có. */
    furiganaMarkup?: string;
    enDesc: string;
    /** Các mẫu ngữ pháp / câu ví dụ tiêu biểu. */
    grammar: string[];
    vocabulary: Vocab[];
    questions: Question[];
    /** Node lộ trình lấy từ BE (vocab / question / chest). */
    pathNodes?: LessonPathNodeMeta[];
}

/** Một bài học (Lesson) gồm nhiều Can-do. */
export interface Lesson {
    id: string;
    code: string;
    order: number;
    jpTitle: string;
    furigana: string;
    /** Markup furigana của BE ("[漢字](かな)…"); ưu tiên hơn `furigana` khi render. */
    furiganaMarkup?: string;
    enTitle: string;
    /** Global order index node đầu/cuối của bài (khóa/mở theo tiến độ). */
    firstNodeOrder?: number;
    lastNodeOrder?: number;
    canDos: CanDo[];
}

/** Một chủ đề (Topic) gồm nhiều Lesson. */
export interface BookTopic {
    id: string;
    code: string;
    order: number;
    jpTitle: string;
    /** Markup furigana của BE ("[漢字](かな)…"); ưu tiên hơn `jpTitle` khi render. */
    furiganaMarkup?: string;
    enTitle: string;
    /** Global order index node đầu/cuối của chủ đề (khóa/mở theo tiến độ). */
    firstNodeOrder?: number;
    lastNodeOrder?: number;
    lessons: Lesson[];
}

/** Một quyển sách Marugoto. */
export interface MarugotoBook {
    id: string;
    code: string;
    /** Nhãn cấp độ hiển thị, ví dụ "A2-2". */
    level: string;
    /** Khung CEFR gốc, ví dụ "A2". */
    cefr: string;
    /** Cấp JLPT tương ứng, ví dụ "N5". */
    jlpt?: string;
    /** Thứ tự trình độ để quyết định khóa/mở (nhỏ = dễ hơn). */
    cefrOrder: number;
    order: number;
    title: string;
    subtitle: string;
    /**
     * Ảnh bìa thật đặt trong `public/images/books/`, ví dụ
     * "/images/books/a2-2.jpg". Bỏ trống → dùng bìa màu generated (mock).
     */
    coverImage?: string;
    /** Màu nền cho bìa mock (khi chưa có coverImage). */
    coverColor?: string;
    /** Global order index node đầu/cuối của quyển (khóa/mở theo tiến độ). */
    firstNodeOrder?: number;
    lastNodeOrder?: number;
    /** Chỉ quyển được mock đầy đủ mới có topics; quyển khác để rỗng. */
    topics: BookTopic[];
}
