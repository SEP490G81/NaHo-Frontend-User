"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { HistoryCustomRowCard, HistoryCustomRowDesktop } from "../features/history-custom.row";

interface HistoryCustomListProps {
  filtered: any[];
}

export function HistoryCustomList({ filtered }: HistoryCustomListProps) {
  const t = useTranslations("history");

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-bdc-primary bg-bgc-app md:block shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-bgc-page text-xs uppercase tracking-wide text-text-muted border-b border-bdc-primary">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">{t("tableDate")}</th>
              <th className="px-4 py-3 text-left font-semibold">{t("tableTopic")}</th>
              <th className="px-4 py-3 text-left font-semibold">{t("tableQuestion")}</th>
              <th className="px-4 py-3 text-left font-semibold">{t("tableAudio")}</th>
              <th className="px-4 py-3 text-left font-semibold">{t("tableScore")}</th>
              <th className="px-4 py-3 text-right font-semibold">{t("tableAction")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <HistoryCustomRowDesktop key={entry.historyId} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {filtered.map((entry) => (
          <HistoryCustomRowCard key={entry.historyId} entry={entry} />
        ))}
      </div>
    </>
  );
}

export default HistoryCustomList;
