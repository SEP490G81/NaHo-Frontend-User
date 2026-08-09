import type {BookResponse} from "@/types/responses/book.response";
import {mapBook} from "./mapper";
import type {MarugotoBook} from "./types";

/**
 * Chuẩn hóa danh sách sách từ API: sắp theo trình độ và gán `cefrOrder` tuần tự
 * (1..N) để logic khóa/mở (isBookUnlocked) hoạt động khi BE chưa trả trạng thái
 * khóa theo học viên.
 */
export function mapBookList(remote: BookResponse[]): MarugotoBook[] {
    return [...remote]
        .sort((a, b) => a.orderIndex - b.orderIndex || a.id - b.id)
        .map((r, i) => {
            const book = mapBook(r);
            book.cefrOrder = i + 1;
            return book;
        });
}
