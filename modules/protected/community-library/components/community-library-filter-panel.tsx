"use client";
import React from "react";
import { Switch } from "@mui/material";
import CommunityFilters from "../features/community.filters";
import type { CommunityCategory } from "@/data/mockCommunityQuestions";

interface CommunityLibraryFilterPanelProps {
    t: any;
    showFurigana: boolean;
    onFuriganaChange: (checked: boolean) => void;
    query: string;
    onQueryChange: (query: string) => void;
    category: CommunityCategory | "all";
    onCategoryChange: (category: CommunityCategory | "all") => void;
}

export function CommunityLibraryFilterPanel({
    t,
    showFurigana,
    onFuriganaChange,
    query,
    onQueryChange,
    category,
    onCategoryChange,
}: CommunityLibraryFilterPanelProps) {
    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-col gap-4 rounded-md border p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-text-contrast text-sm font-semibold">
                    {t("filterTitle")}
                </h2>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="furigana-toggle"
                        className="text-text-muted cursor-pointer text-xs font-medium"
                    >
                        {t("showFurigana")}
                    </label>
                    <Switch
                        id="furigana-toggle"
                        checked={showFurigana}
                        onChange={(e) => onFuriganaChange(e.target.checked)}
                        sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "var(--color-bgc-highlight)",
                                "& + .MuiSwitch-track": {
                                    backgroundColor: "var(--color-bgc-highlight)",
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <CommunityFilters
                query={query}
                onQueryChange={onQueryChange}
                category={category}
                onCategoryChange={onCategoryChange}
            />
        </div>
    );
}

export default CommunityLibraryFilterPanel;
