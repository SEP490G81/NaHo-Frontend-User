"use client";
import React from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface HistoryCustomFiltersProps {
    query: string;
    onQueryChange: (q: string) => void;
}

export function HistoryCustomFilters({
    query,
    onQueryChange,
}: HistoryCustomFiltersProps) {
    const t = useTranslations("history");

    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-wrap items-center gap-3 rounded-md border p-4 shadow-sm">
            <div className="relative min-w-[240px] flex-1">
                <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={t("filterPlaceholder")}
                    className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:outline-none"
                />
            </div>
        </div>
    );
}

export default HistoryCustomFilters;
