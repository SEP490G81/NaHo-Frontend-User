"use client";
import React from "react";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import StatusBadge from "@/components/ui/status.badge";
import type { LessonView } from "../utils/unlock";

export function LessonRow({ view, bookId }: { view: LessonView; bookId: string }) {
    const t = useTranslations("marugoto");
    const { lesson, status, percent } = view;
    const locked = status === "locked";

    return (
        <div
            className={cn(
                "border-bdc-primary bg-bgc-page flex items-center gap-3 rounded-xl border px-4 py-3",
                locked && "opacity-70",
            )}
        >
            <div
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold",
                    status === "completed" &&
                        "border-text-success/40 bg-text-success/15 text-text-success",
                    status === "active" &&
                        "border-bgc-highlight/50 bg-bgc-highlight/15 text-bgc-highlight",
                    locked && "border-bdc-primary bg-bgc-app text-text-muted",
                )}
            >
                {status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5" />
                ) : locked ? (
                    <Lock className="h-4 w-4" />
                ) : (
                    lesson.order
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-text-contrast truncate text-sm font-semibold">
                    {t("lesson.label", { number: lesson.order })}:{" "}
                    {lesson.furiganaMarkup ? (
                        <FuriganaMarkup markup={lesson.furiganaMarkup} />
                    ) : (
                        <FuriganaText
                            text={lesson.jpTitle}
                            furigana={lesson.furigana}
                        />
                    )}
                </p>
                {(lesson.enTitle || lesson.canDos.length > 0) && (
                    <p className="text-text-muted truncate text-xs">
                        {lesson.enTitle}
                        {lesson.enTitle && lesson.canDos.length > 0 && " · "}
                        {lesson.canDos.length > 0 &&
                            t("lesson.candoCount", {
                                count: lesson.canDos.length,
                            })}
                    </p>
                )}
            </div>

            <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className="text-bgc-highlight text-xs font-semibold">
                    {percent}%
                </span>
                <StatusBadge status={status} label={t(`status.${status}`)} />
            </div>

            {locked ? (
                <button
                    type="button"
                    onClick={() => toast.info(t("lockedToastDesc"))}
                    className="border-bdc-primary bg-bgc-page text-text-muted inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
                >
                    <Lock className="h-3.5 w-3.5" />
                    {t("lesson.needUnlock")}
                </button>
            ) : (
                <Link
                    href={`/books/${bookId}/${lesson.id}`}
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                >
                    <PlayCircle className="h-4 w-4" />
                    {status === "completed"
                        ? t("lesson.review")
                        : t("lesson.enter")}
                </Link>
            )}
        </div>
    );
}

export default LessonRow;
