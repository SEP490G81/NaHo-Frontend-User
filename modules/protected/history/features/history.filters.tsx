"use client";
import React from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Select, MenuItem, FormControl } from "@mui/material";
import { mockTopics } from "@/data/mockTopics";

interface HistoryFiltersProps {
    query: string;
    onQueryChange: (q: string) => void;
    topicId: string;
    onTopicChange: (id: string) => void;
}

export function HistoryFilters({
    query,
    onQueryChange,
    topicId,
    onTopicChange,
}: HistoryFiltersProps) {
    const t = useTranslations("history");

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-bdc-primary bg-bgc-app p-4">
            <div className="relative flex-1 min-w-[240px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={t("filterPlaceholder")}
                    className="w-full rounded-lg border border-bdc-primary bg-bgc-page py-2 pl-9 pr-4 text-sm text-text-contrast placeholder-text-muted focus:border-bgc-highlight focus:outline-none"
                />
            </div>

            <FormControl size="small" className="w-[200px] shrink-0">
                <Select
                    value={topicId}
                    onChange={(e) => onTopicChange(e.target.value)}
                    displayEmpty
                    sx={{
                        backgroundColor: "var(--color-bgc-page)",
                        color: "var(--color-text-contrast)",
                        fontSize: "0.875rem",
                        height: "38px",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--color-bdc-primary)",
                        },
                        "& hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--color-bdc-primary)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--color-bgc-highlight)",
                        },
                    }}
                >
                    <MenuItem value="all" className="text-sm">
                        {t("filterAllTopics")}
                    </MenuItem>
                    {mockTopics.map((topic) => (
                        <MenuItem key={topic.id} value={topic.id} className="text-sm">
                            {topic.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default HistoryFilters;
