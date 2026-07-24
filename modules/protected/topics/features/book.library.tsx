"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import {
    getLearningPathNodeDetail,
    listBooks,
} from "@/services/client/book.service";
import { getUserLearningProgress } from "@/modules/protected/leaderboard/services/leaderboard.service";
import { getBooks, mapBookList } from "@/data/marugoto";
import type { MarugotoBook } from "@/data/marugoto/types";
import BookCard from "../components/book.card";

function LibrarySkeleton() {
    return (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="border-bdc-primary bg-bgc-page aspect-[3/4] animate-pulse rounded-2xl border"
                />
            ))}
        </div>
    );
}

export function BookLibrary() {
    const t = useTranslations("marugoto");
    const [books, setBooks] = useState<MarugotoBook[] | null>(null);

    useEffect(() => {
        let active = true;
        listBooks()
            .then((remote) => {
                if (active) setBooks(mapBookList(remote));
            })
            .catch((err) => {
                // BE lỗi / CORS / chưa đăng nhập → dùng dữ liệu mock cục bộ.
                console.warn("[books] fetch failed, fallback to mock:", err);
                if (active) setBooks(getBooks());
            });
        return () => {
            active = false;
        };
    }, []);

    // Tiến độ thật + node "biên giới" xa nhất để quyết định khóa/mở sách.
    const { data: progress } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
    });
    const farthestId = progress?.farthestAvailableNodeId ?? 0;
    const { data: frontierNode } = useQuery({
        queryKey: ["learning-node", farthestId],
        queryFn: () => getLearningPathNodeDetail(farthestId),
        enabled: farthestId > 0,
    });

    // GOI biên giới: node xa nhất đã mở; chưa học → mốc nhỏ nhất (mở quyển đầu).
    const frontier = useMemo(() => {
        if (frontierNode?.globalOrderIndex != null) {
            return frontierNode.globalOrderIndex;
        }
        const firsts = (books ?? [])
            .map((b) => b.firstNodeOrder)
            .filter((v): v is number => v != null);
        return firsts.length ? Math.min(...firsts) : undefined;
    }, [frontierNode, books]);

    // Chỉ khóa khi có dữ liệu node thật từ BE; mock/thiếu dữ liệu → mở tất cả.
    const hasNodeData = !!books?.some((b) => b.firstNodeOrder != null);

    const isUnlocked = (b: MarugotoBook) => {
        if (!hasNodeData || frontier == null) return true;
        return b.firstNodeOrder != null && b.firstNodeOrder <= frontier;
    };
    const isCurrent = (b: MarugotoBook) =>
        hasNodeData &&
        frontier != null &&
        b.firstNodeOrder != null &&
        b.lastNodeOrder != null &&
        frontier >= b.firstNodeOrder &&
        frontier <= b.lastNodeOrder;

    return (
        <div className="border-bdc-primary bg-bgc-app space-y-6 rounded-2xl border p-6">
            <div>
                <p className="text-text-muted text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {t("books.chooseBook")}
                </p>
                <h2 className="text-text-contrast text-lg font-bold md:text-xl">
                    {t("books.library")}
                </h2>
            </div>

            {books === null ? (
                <LibrarySkeleton />
            ) : (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            unlocked={isUnlocked(book)}
                            current={isCurrent(book)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookLibrary;
