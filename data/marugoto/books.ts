import type { MarugotoBook } from "./types";
import { a22Topics } from "./a2-2.katsudoo";

/**
 * Metadata 6 quyển sách Marugoto theo trình độ tăng dần.
 * Chỉ quyển A2-2 (Elementary 2 Katsudoo) được mock đầy đủ topics ở giai đoạn này.
 */
export const MARUGOTO_BOOKS: MarugotoBook[] = [
    {
        id: "book-n5",
        code: "Marugoto N5",
        level: "N5 / A1",
        cefr: "A1",
        cefrOrder: 1,
        order: 1,
        title: "Marugoto Starter (A1)",
        subtitle: "Nhập môn · Bảng chữ & câu chào cơ bản",
        coverColor: "#7c9cc4",
        topics: [],
    },
    {
        id: "book-a2-1",
        code: "Marugoto A2-1",
        level: "A2-1",
        cefr: "A2",
        cefrOrder: 2,
        order: 2,
        title: "Elementary 1 (A2)",
        subtitle: "Sơ trung cấp · Hoạt động giao tiếp cơ bản",
        coverColor: "#e59ab0",
        topics: [],
    },
    {
        id: "book-a2-2",
        code: "Marugoto A2-2",
        level: "A2-2",
        cefr: "A2",
        cefrOrder: 3,
        order: 3,
        title: "Elementary 2 (A2) Katsudoo",
        subtitle: "Sơ trung cấp · Nâng cao phản xạ giao tiếp",
        coverColor: "#d76a99",
        // Thả ảnh bìa vào public/images/books/ rồi bỏ comment dòng dưới:
        // coverImage: "/images/books/a2-2.jpg",
        topics: a22Topics,
    },
    {
        id: "book-b1-1",
        code: "Marugoto B1-1",
        level: "B1-1",
        cefr: "B1",
        cefrOrder: 4,
        order: 4,
        title: "Pre-Intermediate (B1)",
        subtitle: "Trung cấp · Giao tiếp công việc",
        coverColor: "#6fa891",
        topics: [],
    },
    {
        id: "book-b1-2",
        code: "Marugoto B1-2",
        level: "B1-2",
        cefr: "B1",
        cefrOrder: 5,
        order: 5,
        title: "Intermediate 1 (B1)",
        subtitle: "Trung cấp · Đàm phán & báo cáo",
        coverColor: "#9384cc",
        topics: [],
    },
    {
        id: "book-b2",
        code: "Marugoto B2",
        level: "B2",
        cefr: "B2",
        cefrOrder: 6,
        order: 6,
        title: "Intermediate 2 (B2)",
        subtitle: "Cao cấp · Phản biện & thuyết trình",
        coverColor: "#cf9264",
        topics: [],
    },
];

/** Trình độ hiện tại (mock) của người dùng — quyết định quyển nào bị khóa. */
export const USER_CEFR_ORDER = 3; // đang học A2-2

/** Id quyển sách người dùng đang học (tab mặc định khi mở trang). */
export const CURRENT_BOOK_ID = "book-a2-2";
