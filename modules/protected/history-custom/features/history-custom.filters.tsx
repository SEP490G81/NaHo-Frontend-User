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
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-bdc-primary bg-bgc-app p-4 shadow-sm">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("filterPlaceholder")}
          className="w-full rounded-lg border border-bdc-primary bg-bgc-page py-2 pl-9 pr-4 text-sm text-text-contrast placeholder-text-muted focus:border-bgc-highlight focus:outline-none"
        />
      </div>
    </div>
  );
}

export default HistoryCustomFilters;
