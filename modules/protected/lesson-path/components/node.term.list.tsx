import React from "react";
import type {NodeVocabularyItem} from "@/types/responses/learning.response";

/** Danh sách thuật ngữ (từ vựng / mẫu ngữ pháp) BE: tiếng Nhật + cách đọc + nghĩa. */
export function NodeTermList({ items }: { items: NodeVocabularyItem[] }) {
    return (
        <ul className="space-y-1.5">
            {items.map((v) => (
                <li
                    key={v.id}
                    className="border-bdc-primary flex items-start justify-between gap-3 border-b border-dashed pb-1.5 text-sm last:border-0"
                >
                    <span className="font-noto-jp text-text-contrast">
                        {v.japanese}
                        {v.reading && v.reading !== v.japanese ? (
                            <span className="text-text-muted ml-1 text-xs">
                                ({v.reading})
                            </span>
                        ) : null}
                    </span>
                    <span className="text-text-muted shrink-0 text-right">
                        {v.vietnameseMeaningText}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default NodeTermList;
