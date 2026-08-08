"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { listBooks } from "@/services/client/book.service";
import { useLearningFrontier } from "@/hooks/use.learning.frontier";
import { getBooks, mapBookList } from "@/data/marugoto";
import type { MarugotoBook } from "@/data/marugoto/types";
import BookCard from "../components/book.card";
import ContainerBox from "@/components/ui/container.box";

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

    // Mốc tiến độ thật của người dùng để quyết định khóa/mở sách.
    const { frontier } = useLearningFrontier();

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
        <ContainerBox>
            <div>
                <p className="text-text-muted text-sm font-semibold uppercase">
                    {t("books.chooseBook")}
                </p>
                <h2 className="text-text-contrast my-3 text-lg font-bold md:text-xl">
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
        </ContainerBox>
    );
}

export default BookLibrary;
