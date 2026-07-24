"use client";
import { useQuery } from "@tanstack/react-query";
import { listBooks } from "@/services/client/book.service";
import { mapBookList } from "@/data/marugoto";
import type { MarugotoBook } from "@/data/marugoto/types";
import { useLearningFrontier } from "./use.learning.frontier";

/**
 * Quyển sách người dùng đang học = quyển chứa node tại mốc tiến độ hiện tại.
 * Người dùng mới đứng ở node đầu giáo trình nên rơi vào quyển đầu (N5 · A1).
 */
export function useCurrentBook(): MarugotoBook | null {
    const { frontier } = useLearningFrontier();
    const { data: books } = useQuery({
        queryKey: ["books"],
        queryFn: () => listBooks().then(mapBookList),
    });

    if (!books?.length) return null;
    const ordered = [...books].sort((a, b) => a.order - b.order);
    if (frontier == null) return ordered[0];

    const current = ordered.find(
        (b) =>
            b.firstNodeOrder != null &&
            b.lastNodeOrder != null &&
            frontier >= b.firstNodeOrder &&
            frontier <= b.lastNodeOrder,
    );
    return current ?? ordered[0];
}

/** Nhãn trình độ hiện tại, ví dụ "N5 · A1"; thiếu dữ liệu → chuỗi rỗng. */
export function useCurrentLevelLabel(): string {
    const book = useCurrentBook();
    if (!book) return "";
    return book.jlpt ? `${book.jlpt} · ${book.cefr}` : book.cefr;
}

export default useCurrentLevelLabel;
