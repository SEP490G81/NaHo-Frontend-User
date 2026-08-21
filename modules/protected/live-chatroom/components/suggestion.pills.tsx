"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface SuggestionPillsProps {
    suggestions: string[];
    onPick: (text: string) => void;
}

export function SuggestionPills({
    suggestions,
    onPick,
}: Readonly<SuggestionPillsProps>) {
    const t = useTranslations("liveChatroom");

    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
            <span className="text-text-muted flex shrink-0 items-center gap-1 text-[11px] font-medium">
                <Sparkles className="text-bgc-highlight h-3 w-3" />
                <span>{t("suggestions")}:</span>
            </span>
            <div className="flex items-center gap-1.5">
                {suggestions.map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => onPick(s)}
                        className="border-bdc-primary bg-bgc-app hover:border-bgc-highlight/60 hover:text-bgc-highlight text-text-contrast shrink-0 cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SuggestionPills;
