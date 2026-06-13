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
        <div className="border-bdc-primary bg-bgc-app flex flex-wrap items-center gap-3 rounded-md border p-4">
            <div className="relative min-w-[240px] flex-1">
                <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={t("filterPlaceholder")}
                    className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:outline-none"
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
                        <MenuItem
                            key={topic.id}
                            value={topic.id}
                            className="text-sm"
                        >
                            {topic.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default HistoryFilters;
