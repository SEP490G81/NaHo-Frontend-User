"use client";
import React from "react";
import { Mic, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface RecordButtonProps {
    recording: boolean;
    elapsed: number;
    onToggle: () => void;
}

function formatTime(sec: number) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

export function RecordButton({ recording, elapsed, onToggle }: RecordButtonProps) {
    const t = useTranslations("sandbox");

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-44 w-44 items-center justify-center">
                {recording && (
                    <>
                        <span className="absolute inset-0 animate-ping rounded-full bg-bgc-highlight/30" />
                        <span className="absolute inset-2 animate-pulse rounded-full bg-bgc-highlight/20" />
                    </>
                )}
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={recording ? t("recordingBtnStop") : t("recordingBtnStart")}
                    className={cn(
                        "relative z-10 flex h-32 w-32 items-center justify-center rounded-full text-text-pure shadow-lg transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bgc-highlight/50",
                        recording
                            ? "bg-bgc-error hover:bg-hbgc-error"
                            : "bg-bgc-highlight hover:scale-105"
                    )}
                >
                    {recording ? <Square className="h-10 w-10 fill-current" /> : <Mic className="h-12 w-12" />}
                </button>
            </div>

            <div className="font-mono text-2xl tabular-nums text-text-contrast">{formatTime(elapsed)}</div>

            {recording && (
                <div className="flex h-12 items-end justify-center gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                        <span
                            key={i}
                            className="w-1 rounded-full bg-bgc-highlight"
                            style={{
                                height: `${20 + Math.abs(Math.sin((elapsed * 2 + i) * 0.5)) * 80}%`,
                                transition: "height 180ms ease-out",
                            }}
                        />
                    ))}
                </div>
            )}

            <p className="text-xs text-text-muted">
                {recording ? t("recordingHintActive") : t("recordingHintIdle")}
            </p>
        </div>
    );
}

export default RecordButton;
