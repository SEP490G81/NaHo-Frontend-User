"use client";
import React from "react";
import { RotateCcw, Wand2 } from "lucide-react";
import { Link } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import ScoreBadge from "../../history/components/score.badge";
import MockAudioBar from "../../history-detail/components/mock.audio.bar";

function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface Props {
  entry: QuestionHistoryEntry;
}

const CUSTOM_BADGE = (
  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-bgc-highlight/15 px-2 py-0.5 text-[10px] font-medium text-bgc-highlight">
    <Wand2 className="h-3 w-3" /> Đề tự soạn
  </span>
);

export function HistoryCustomRowDesktop({ entry }: Props) {
  const t = useTranslations("page.historyCustom");

  return (
    <tr className="border-b border-bdc-primary transition-colors hover:bg-hbgc-app">
      <td className="px-4 py-3 align-middle text-sm whitespace-nowrap text-text-muted">
        {formatDate(entry.practicedAt)}
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="flex flex-col gap-1 text-text-contrast">
          <span className="font-semibold leading-tight">Đề chọn tự phát</span>
          {CUSTOM_BADGE}
        </div>
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="max-w-xs">
          <p className="font-noto-jp text-sm leading-snug text-text-contrast">
            {entry.customJp || "Câu hỏi tự soạn"}
          </p>
          {entry.customHintVi && (
            <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">
              {entry.customHintVi}
            </p>
          )}
        </div>
      </td>
      <td className="px-4 py-3 align-middle">
        <MockAudioBar durationSec={entry.durationSec} />
      </td>
      <td className="px-4 py-3 align-middle">
        <ScoreBadge score={entry.score} />
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/custom-question"
            className="inline-flex h-8 items-center justify-center rounded-md bg-bgc-highlight px-3 text-xs font-semibold text-white transition-colors hover:bg-bgc-highlight/90 shadow-sm"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            {t("retryBtn")}
          </Link>
        </div>
      </td>
    </tr>
  );
}

export function HistoryCustomRowCard({ entry }: Props) {
  const t = useTranslations("page.historyCustom");

  return (
    <article className="rounded-xl border border-bdc-primary bg-bgc-app p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs text-text-muted">{formatDate(entry.practicedAt)}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-bgc-highlight/15 px-2 py-0.5 text-[10px] font-medium text-bgc-highlight">
            <Wand2 className="h-3 w-3" /> Đề chọn tự phát
          </span>
        </div>
        <ScoreBadge score={entry.score} />
      </div>

      <div className="max-w-xs">
        <p className="font-noto-jp text-sm leading-snug text-text-contrast">
          {entry.customJp || "Câu hỏi tự soạn"}
        </p>
        {entry.customHintVi && (
          <p className="mt-0.5 text-xs text-text-muted">
            {entry.customHintVi}
          </p>
        )}
      </div>

      <MockAudioBar durationSec={entry.durationSec} />

      <div className="flex items-center justify-end gap-2 pt-1">
        <Link
          href="/custom-question"
          className="inline-flex h-8 items-center justify-center rounded-md bg-bgc-highlight px-3 text-xs font-semibold text-white transition-colors hover:bg-bgc-highlight/90 shadow-sm"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          {t("retryBtn")}
        </Link>
      </div>
    </article>
  );
}
