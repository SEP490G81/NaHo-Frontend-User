"use client";
import React from "react";
import { Mic, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";

interface RecordButtonProps {
    recording: boolean;
    elapsed: number;
    /** Thời gian nói tối đa (giây) theo gói đăng ký. */
    maxSeconds: number;
    onToggle: () => void;
    accent?: string;
}

function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
        .toString()
        .padStart(2, "0");
    const s = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
}

export function RecordButton({
    recording,
    elapsed,
    maxSeconds,
    onToggle,
    accent = "var(--color-bgc-highlight)",
}: RecordButtonProps) {
    const t = useTranslations("sandbox");
    // Đếm ngược: khi chưa ghi hiện đủ ngân sách; đang ghi hiện số giây còn lại.
    const remaining = Math.max(maxSeconds - elapsed, 0);
    const display = recording ? remaining : maxSeconds;
    const urgent = recording && remaining <= 5;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-44 w-44 items-center justify-center">
                {recording && (
                    <>
                        <span
                            className="absolute inset-0 animate-ping rounded-full"
                            style={{
                                background: `color-mix(in srgb, ${accent} 28%, transparent)`,
                            }}
                        />
                        <span
                            className="absolute inset-2 animate-pulse rounded-full"
                            style={{
                                background: `color-mix(in srgb, ${accent} 18%, transparent)`,
                            }}
                        />
                    </>
                )}
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={
                        recording
                            ? t("recordingBtnStop")
                            : t("recordingBtnStart")
                    }
                    className={cn(
                        "text-text-pure relative z-10 flex h-32 w-32 items-center justify-center rounded-full shadow-lg transition-all focus-visible:ring-4 focus-visible:outline-none",
                        recording
                            ? "bg-bgc-error hover:bg-hbgc-error"
                            : "hover:scale-105",
                    )}
                    style={recording ? undefined : { background: accent }}
                >
                    {recording ? (
                        <Square className="h-10 w-10 fill-current" />
                    ) : (
                        <Mic className="h-12 w-12" />
                    )}
                </button>
            </div>

            <div
                className={cn(
                    "font-mono text-2xl tabular-nums transition-colors",
                    urgent
                        ? "text-bgc-error font-bold"
                        : "text-text-contrast",
                )}
            >
                {formatTime(display)}
            </div>

            {recording && (
                <div className="flex h-12 items-end justify-center gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                        <span
                            key={i}
                            className="w-1 rounded-full"
                            style={{
                                background: urgent
                                    ? "var(--color-bgc-error)"
                                    : accent,
                                height: `${20 + Math.abs(Math.sin((elapsed * 2 + i) * 0.5)) * 80}%`,
                                transition: "height 180ms ease-out",
                            }}
                        />
                    ))}
                </div>
            )}

            <p className="text-text-muted text-xs">
                {recording
                    ? t("recordingRemaining")
                    : t("recordingBudget", { seconds: maxSeconds })}
            </p>
        </div>
    );
}

export default RecordButton;
