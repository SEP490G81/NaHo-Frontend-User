"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { listBooks } from "@/services/client/book.service";
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
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookLibrary;
