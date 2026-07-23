"use client";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { MarugotoBook } from "@/data/marugoto/types";
import { useMarugotoStore, PASS_SCORE } from "@/store/marugotoStore";
import { buildBookView } from "../utils/unlock";
import BookHero from "../components/book.hero";
import TopicRow from "../components/topic.row";

export function TopicRoadmap({ book }: { book: MarugotoBook }) {
    const t = useTranslations("marugoto");
    const scores = useMarugotoStore((s) => s.questionScores);
    const accent = book.coverColor ?? "var(--color-bgc-highlight)";

    const views = useMemo(
        () => buildBookView(book.topics, scores, PASS_SCORE),
        [book, scores],
    );

    return (
        <div className="space-y-5">
            <BookHero book={book} views={views} />

            {book.topics.length === 0 ? (
                <div className="border-bdc-primary bg-bgc-app text-text-muted rounded-2xl border border-dashed p-12 text-center">
                    {t("books.empty")}
                </div>
            ) : (
                <div className="space-y-3">
                    {views.map((v) => (
                        <TopicRow
                            key={v.topic.id}
                            view={v}
                            bookId={book.id}
                            accent={accent}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TopicRoadmap;
