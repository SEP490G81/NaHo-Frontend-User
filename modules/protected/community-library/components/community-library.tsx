"use client";
import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Switch } from "@mui/material";
import { Link, useRouter } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import CommunityFilters from "../features/community.filters";
import CommunityQuestionCard from "./community-question.card";
import {
  mockCommunityQuestions,
  type CommunityCategory,
} from "@/data/mockCommunityQuestions";

export function CommunityLibrary() {
  const { push } = useRouter();
  const t = useTranslations("page.communityLibrary");

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
            <h1 className="text-2xl font-bold tracking-tight text-text-contrast">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              {t("subtitle")}
            </p>
          </div>
          <Button
            onClick={() => push({
              pathname: "/custom-question",
              // We pass parameter share via query or state if needed, here we just push to standard custom question
            })}
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

        <div className="flex flex-col gap-4 rounded-xl border border-bdc-primary bg-bgc-app p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-text-contrast">
              {t("filterTitle")}
            </h2>
            <div className="flex items-center gap-2">
              <label
                htmlFor="furigana-toggle"
                className="text-xs text-text-muted cursor-pointer font-medium"
              >
                {t("showFurigana")}
              </label>
              <Switch
                id="furigana-toggle"
                checked={showFurigana}
                onChange={(e) => setShowFurigana(e.target.checked)}
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
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-bdc-primary bg-bgc-app p-10 text-center text-sm text-text-muted shadow-sm">
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
