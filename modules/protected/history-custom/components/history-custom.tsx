"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Wand2, History as HistoryIcon } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/intl/i18n/navigation";
import { getHistoryList } from "@/modules/protected/history/services/history.service";
import HistoryCustomFilters from "../features/history-custom.filters";
import HistoryCustomList from "./history-custom.list";
import ScoreBadge from "../../history/components/score.badge";

export function HistoryCustom() {
  const t = useTranslations("page.historyCustom");
  const tCommon = useTranslations("page.history");

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistoryList,
  });

  const [query, setQuery] = useState("");

  const scopedEntries = useMemo(() => {
    return entries.filter((e) => e.topicId === "custom");
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...scopedEntries].sort(
      (a, b) => new Date(b.practicedAt).getTime() - new Date(a.practicedAt).getTime()
    );
  }, [scopedEntries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedEntries;
    return sortedEntries.filter((e) => {
      const jpText = (e.customJp || "").toLowerCase();
      const hintText = (e.customHintVi || "").toLowerCase();
      return jpText.includes(q) || hintText.includes(q);
    });
  }, [sortedEntries, query]);

  const totalCount = scopedEntries.length;
  const avgScore =
    totalCount === 0
      ? 0
      : scopedEntries.reduce((sum, e) => sum + e.score, 0) / totalCount;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-text-muted">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl text-text-contrast">
              <Wand2 className="h-6 w-6 text-bgc-highlight" />
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-text-muted flex items-center gap-1">
              {t("subtitle", { total: totalCount })}{" "}
              {totalCount > 0 ? (
                <ScoreBadge score={Number(avgScore.toFixed(1))} />
              ) : (
                <span className="text-text-muted">—</span>
              )}
            </p>
          </div>

          <Button
            component={Link}
            href="/custom-question"
            variant="contained"
            startIcon={<Wand2 className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              backgroundColor: "var(--color-bgc-highlight)",
              color: "var(--color-text-pure)",
              fontWeight: "bold",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {t("createBtn")}
          </Button>
        </header>

        <HistoryCustomFilters query={query} onQueryChange={setQuery} />

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-bdc-primary bg-bgc-app p-10 text-center shadow-sm">
            <HistoryIcon className="h-10 w-10 text-text-muted" />
            <h3 className="text-lg font-semibold text-text-contrast">{t("emptyTitle")}</h3>
            <p className="max-w-md text-sm text-text-muted">
              {t("emptySubtitle")}
            </p>
            <Button
              component={Link}
              href="/custom-question"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "var(--color-bgc-highlight)",
                color: "var(--color-text-pure)",
                fontWeight: "bold",
                marginTop: "8px",
                "&:hover": { opacity: 0.9 },
              }}
            >
              {t("emptyBtn")}
            </Button>
          </div>
        ) : (
          <HistoryCustomList filtered={filtered} />
        )}
      </div>
    </div>
  );
}

export default HistoryCustom;
