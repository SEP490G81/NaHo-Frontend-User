"use client";
import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Switch } from "@mui/material";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CommunityFilters from "../features/community.filters";
import CommunityQuestionCard from "./community-question.card";
import {
    type CommunityCategory,
    mockCommunityQuestions,
} from "@/data/mockCommunityQuestions";

export function CommunityLibrary() {
    const { push } = useRouter();
    const t = useTranslations("communityLibrary");

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<CommunityCategory | "all">("all");
    const [showFurigana, setShowFurigana] = useState(true);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return mockCommunityQuestions.filter((item) => {
            if (category !== "all" && item.category !== category) return false;
            if (!q) return true;
            return (
                item.jp.toLowerCase().includes(q) ||
                item.vi.toLowerCase().includes(q) ||
                item.furigana.toLowerCase().includes(q)
            );
        });
    }, [query, category]);

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                        <h1 className="text-text-contrast text-2xl font-bold tracking-tight">
                            {t("title")}
                        </h1>
                        <p className="text-text-muted mt-1 text-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                    <Button
                        onClick={() =>
                            push({
                                pathname: "/custom-question",
                                // We pass parameter share via query or state if needed, here we just push to standard custom question
                            })
                        }
                        variant="contained"
                        startIcon={<Plus className="h-4 w-4" />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-pure)",
                            fontWeight: "bold",
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        {t("contributeBtn")}
                    </Button>
                </div>

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
                                onChange={(e) =>
                                    setShowFurigana(e.target.checked)
                                }
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "var(--color-bgc-highlight)",
                                        "& + .MuiSwitch-track": {
                                            backgroundColor:
                                                "var(--color-bgc-highlight)",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <CommunityFilters
                        query={query}
                        onQueryChange={setQuery}
                        category={category}
                        onCategoryChange={setCategory}
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="border-bdc-primary bg-bgc-app text-text-muted rounded-md border border-dashed p-10 text-center text-sm shadow-sm">
                        {t("emptyState")}
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((q) => (
                            <CommunityQuestionCard
                                key={q.id}
                                question={q}
                                showFurigana={showFurigana}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommunityLibrary;
