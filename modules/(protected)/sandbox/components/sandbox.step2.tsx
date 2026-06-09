"use client";
import React from "react";
import FuriganaText from "@/components/ui/furigana.text";
import RecordButton from "../features/record.button";
import HintsCard from "../features/hints.card";
import NotesPanel from "./notes.panel";
import { useTranslations } from "next-intl";

interface SandboxStep2Props {
    topicTitle: string;
    question: {
        jp: string;
        furigana: any;
        vi: string;
    };
    showFurigana: boolean;
    recording: boolean;
    elapsed: number;
    toggleRecord: () => void;
    hints: any;
}

export function SandboxStep2({
    topicTitle,
    question,
    showFurigana,
    recording,
    elapsed,
    toggleRecord,
    hints,
}: SandboxStep2Props) {
    const t = useTranslations("page.sandbox");
    return (
        <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
                {/* Question Card Display */}
                <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-medium text-bgc-highlight">
                            {topicTitle}
                        </span>
                        <span className="text-xs text-text-muted">{t("speakQuestion")}</span>
                    </div>
                    <h1 className="mt-3 text-xl font-bold leading-snug md:text-2xl text-text-contrast">
                        <FuriganaText text={question.jp} furigana={question.furigana} showFurigana={showFurigana} />
                    </h1>
                    <p className="mt-2 text-sm text-text-muted">{question.vi}</p>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-bdc-primary bg-bgc-app p-6">
                    <RecordButton recording={recording} elapsed={elapsed} onToggle={toggleRecord} />
                </div>
            </div>
            <aside className="space-y-5">
                <HintsCard hints={hints} showFurigana={showFurigana} />
                <NotesPanel />
            </aside>
        </section>
    );
}

export default SandboxStep2;
