"use client";
import React from "react";
import type { CanDoBlock } from "../hooks/use.cando.nodes";
import CanDoAccordionItem from "../components/cando.accordion.item";

interface Props {
    blocks: CanDoBlock[];
    bookId: string;
    lessonId: string;
    showFurigana: boolean;
}

export function CanDoAccordion({ blocks, bookId, lessonId, showFurigana }: Props) {
    const activeId =
        blocks.find((b) => b.status === "active")?.cando.id ??
        blocks[0]?.cando.id;

    return (
        <div className="space-y-4">
            {blocks.map((block) => (
                <CanDoAccordionItem
                    key={block.cando.id}
                    block={block}
                    bookId={bookId}
                    lessonId={lessonId}
                    showFurigana={showFurigana}
                    defaultOpen={block.cando.id === activeId}
                />
            ))}
        </div>
    );
}

export default CanDoAccordion;
