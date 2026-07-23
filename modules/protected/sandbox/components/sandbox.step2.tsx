"use client";
import React from "react";
import { Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import type { QuestionHints } from "@/data/mockHints";
import RecordButton from "../features/record.button";
import HintsCard from "../features/hints.card";
import NotesPanel from "./notes.panel";

interface SandboxStep2Props {
    recording: boolean;
    elapsed: number;
    toggleRecord: () => void;
    hints: QuestionHints;
    showFurigana: boolean;
    accent: string;
}

export function SandboxStep2({
    recording,
    elapsed,
    toggleRecord,
    hints,
    showFurigana,
    accent,
}: SandboxStep2Props) {
    const t = useTranslations("sandbox");
    return (
        <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="border-bdc-primary bg-bgc-app flex flex-col overflow-hidden rounded-2xl border">
                <div className="border-bdc-primary flex items-center gap-2 border-b px-5 py-3.5">
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{
                            background: `color-mix(in srgb, ${accent} 14%, transparent)`,
                            color: accent,
                        }}
                    >
                        <Mic className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-text-contrast text-sm font-bold">
                            {t("recordCardTitle")}
                        </p>
                        <p className="text-text-muted text-xs">
                            {t("recordCardHint")}
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-1 items-center justify-center px-6 py-10">
                    {/* Nền glow mềm theo màu sách để mic không trơ giữa khối trắng. */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: `radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, ${accent} 12%, transparent), transparent 70%)`,
                        }}
                    />
                    <RecordButton
                        recording={recording}
                        elapsed={elapsed}
                        onToggle={toggleRecord}
                        accent={accent}
                    />
                </div>
            </div>

            <aside className="space-y-5">
                <HintsCard
                    hints={hints}
                    showFurigana={showFurigana}
                    accent={accent}
                />
                <NotesPanel />
            </aside>
        </section>
    );
}

export default SandboxStep2;
