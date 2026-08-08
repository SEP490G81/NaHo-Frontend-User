"use client";

import React from "react";
import { useTranslations } from "next-intl";
import BookCover from "@/components/ui/book.cover";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import { MARUGOTO_BOOKS } from "@/data/marugoto/books";
import { MarugotoBook } from "@/data/marugoto/types";
import { PinnedTopic } from "@/store/uiStore";

interface SidebarPinnedTopicCardProps {
    pinned: PinnedTopic;
    onUnpin?: (e: React.MouseEvent) => void;
    showFurigana?: boolean;
}

export function SidebarPinnedTopicCard({
    pinned,
    showFurigana = true,
}: Readonly<SidebarPinnedTopicCardProps>) {
    const t = useTranslations("marugoto");

    const matchedBook = MARUGOTO_BOOKS.find((b) => b.id === pinned.bookId);
    const book: MarugotoBook = matchedBook || {
        id: pinned.bookId,
        code: pinned.bookTitle || pinned.bookLevel || "Marugoto",
        level: pinned.bookLevel || "A1",
        cefr: pinned.bookLevel?.split("-")[0] || "A1",
        cefrOrder: 1,
        order: 1,
        title: pinned.bookTitle || `Marugoto (${pinned.bookLevel || "A1"})`,
        subtitle: "",
        coverImage: pinned.bookCoverImage,
        coverColor: pinned.bookCoverColor || "#d76a99",
        topics: [],
    };

    const bookName = pinned.bookTitle || book.title;
    const topicNumberStr = pinned.topicOrder
        ? t("topic.label", { index: pinned.topicOrder })
        : t("path.pinnedSection");
    const topicTitleStr = pinned.topicTitle || pinned.title;
    const descriptionStr = pinned.topicDescription || pinned.topicEnTitle || "";

    return (
        <div className="flex w-72 max-w-sm items-start gap-3 p-2.5">
            {/* Left side: Book Cover Image */}
            <div className="border-bdc-primary/50 relative shrink-0 overflow-hidden rounded-lg border shadow-xs">
                <BookCover
                    book={book}
                    className="h-28 w-20 rounded-lg text-xs"
                />
            </div>

            {/* Right side: Topic info (Book name, Topic number, Topic title, Description) */}
            <div className="flex min-w-0 flex-1 flex-col self-stretch py-0.5">
                <div>
                    {/* Top Row: Book Name & Unpin button */}
                    <span className="text-bgc-highlight line-clamp-1 text-[10px] font-black tracking-wider uppercase">
                        {bookName}
                    </span>

                    {/* Topic Number */}
                    <p className="text-text-muted mt-0.5 text-xs font-bold">
                        {topicNumberStr}
                    </p>

                    {/* Topic Title */}
                    <div className="text-text-contrast mt-1 text-xs leading-snug font-black">
                        {pinned.topicFuriganaMarkup ? (
                            <FuriganaHtml
                                text={topicTitleStr}
                                markup={pinned.topicFuriganaMarkup}
                                showFurigana={showFurigana}
                            />
                        ) : (
                            <span>{topicTitleStr}</span>
                        )}
                    </div>
                </div>

                {/* Description (if available) */}
                {descriptionStr ? (
                    <p className="text-text-muted mt-1.5 line-clamp-2 text-[11px] leading-snug font-medium">
                        {descriptionStr}
                    </p>
                ) : (
                    <p className="text-text-muted mt-1.5 line-clamp-2 text-[11px] leading-snug font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. A facilis magnam qui quod voluptates voluptatum?
                        Aperiam cupiditate, ipsum. Quisquam, temporibus!
                    </p>
                )}
            </div>
        </div>
    );
}

export default SidebarPinnedTopicCard;
