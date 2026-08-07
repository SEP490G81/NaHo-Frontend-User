"use client";
import React from "react";
import { Check, Lock, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import type { LessonGroup } from "../hooks/use.cando.nodes";

interface Props {
    groups: LessonGroup[];
    showFurigana: boolean;
    accent: string;
}

export function LessonNavSidebar({ groups, showFurigana, accent }: Props) {
    const t = useTranslations("marugoto");

    const scrollToLesson = (lessonId: string | number) => {
        const el = document.getElementById(`lesson-${lessonId}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <aside className="sticky top-24 space-y-4">
            <div className="border-bdc-primary/60 bg-bgc-app/95 rounded-2xl border p-4 shadow-sm backdrop-blur-md">
                <div className="mb-3 flex items-center gap-2 border-b border-bdc-primary/30 pb-2.5">
                    <BookOpen className="h-4 w-4" style={{ color: accent }} />
                    <h3 className="text-text-contrast text-xs font-bold tracking-wider uppercase">
                        {t("path.lessonOutline")}
                    </h3>
                </div>

                <nav className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                    {groups.map((g) => {
                        const { lesson, status } = g;
                        const completed = status === "completed";
                        const locked = status === "locked";

                        return (
                            <button
                                key={lesson.id}
                                type="button"
                                onClick={() => scrollToLesson(lesson.id)}
                                className={cn(
                                    "flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all",
                                    completed
                                        ? "bg-emerald-500/10 text-text-success hover:bg-emerald-500/15"
                                        : locked
                                            ? "text-text-muted hover:bg-bgc-page/50 opacity-70"
                                            : "bg-bgc-page text-text-contrast border-bdc-primary/50 border shadow-xs hover:border-bdc-primary",
                                )}
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-extrabold tracking-wider uppercase opacity-80">
                                        {t("lesson.label", {
                                            number: lesson.order,
                                        })}
                                    </p>
                                    <div className="truncate text-xs font-bold leading-tight mt-0.5">
                                        <FuriganaHtml
                                            text={lesson.jpTitle}
                                            markup={lesson.furiganaMarkup}
                                            showFurigana={showFurigana}
                                        />
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    {completed ? (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                                            <Check
                                                className="h-3 w-3"
                                                strokeWidth={3}
                                            />
                                        </span>
                                    ) : locked ? (
                                        <Lock className="h-3.5 w-3.5 text-text-muted" />
                                    ) : (
                                        <span
                                            className="h-2.5 w-2.5 rounded-full animate-pulse inline-block"
                                            style={{ background: accent }}
                                        />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

export default LessonNavSidebar;
