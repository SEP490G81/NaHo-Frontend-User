"use client";
import React from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import {
    COMMUNITY_CATEGORIES,
    type CommunityCategory,
} from "@/data/mockCommunityQuestions";

interface CommunityFiltersProps {
    query: string;
    onQueryChange: (v: string) => void;
    category: CommunityCategory | "all";
    onCategoryChange: (v: CommunityCategory | "all") => void;
}

export function CommunityFilters({
    query,
    onQueryChange,
    category,
    onCategoryChange,
}: CommunityFiltersProps) {
    const t = useTranslations("communityLibrary");

    return (
        <div className="flex flex-col gap-3">
            <div className="relative">
                <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight w-full rounded-lg border py-2 pr-4 pl-9 text-sm focus:outline-none"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {COMMUNITY_CATEGORIES.map((c) => {
                    const active = category === c.value;
                    return (
                        <Button
                            key={c.value}
                            onClick={() => onCategoryChange(c.value)}
                            variant={active ? "contained" : "outlined"}
                            size="small"
                            sx={{
                                textTransform: "none",
                                borderRadius: "9999px",
                                fontWeight: "semibold",
                                fontSize: "0.825rem",
                                ...(active
                                    ? {
                                          backgroundColor:
                                              "var(--color-bgc-highlight)",
                                          color: "var(--color-text-pure)",
                                          borderColor:
                                              "var(--color-bgc-highlight)",
                                          "&:hover": { opacity: 0.9 },
                                      }
                                    : {
                                          borderColor:
                                              "var(--color-bdc-primary)",
                                          color: "var(--color-text-contrast)",
                                          "&:hover": {
                                              borderColor:
                                                  "var(--color-bdc-primary)",
                                              backgroundColor:
                                                  "var(--color-hbgc-app)",
                                          },
                                      }),
                            }}
                        >
                            {c.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

export default CommunityFilters;
