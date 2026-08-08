import React from "react";
import type {NodeVocabularyItem} from "@/types/responses/learning.response";

/** Danh sách thuật ngữ (từ vựng / mẫu ngữ pháp) BE: tiếng Nhật + cách đọc + nghĩa. */
export function NodeTermList({ items }: { items: NodeVocabularyItem[] }) {
    return (
        <ul className="space-y-1.5">
            {items.map((v) => (
                <li
                    key={v.id}
                    className="group border-bdc-primary hover:bg-bgc-page -mx-2 flex items-start justify-between gap-3 rounded-lg border-b border-dashed px-2 py-1.5 text-sm transition-colors last:border-0"
                >
                    <span className="font-noto-jp text-text-contrast min-w-0 flex-1 break-words transition-all group-hover:font-semibold">
                        {v.japanese}
                        {v.reading && v.reading !== v.japanese ? (
                            <span className="text-text-muted ml-1 text-xs">
                                ({v.reading})
                            </span>
                        ) : null}
                    </span>
                    <span className="text-text-muted group-hover:text-text-contrast max-w-[45%] shrink-0 text-right break-words transition-colors group-hover:font-medium">
                        {v.vietnameseMeaningText}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default NodeTermList;
