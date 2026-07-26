"use client";
import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Dialog } from "@mui/material";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";

interface SandboxAnalyzingOverlayProps {
    analyzing: boolean;
    accent?: string;
}

const CRIT_KEYS = ["critPron", "critVocab", "critGrammar", "critNatural"] as const;

export function SandboxAnalyzingOverlay({
    analyzing,
    accent = "var(--color-bgc-highlight)",
}: SandboxAnalyzingOverlayProps) {
    const t = useTranslations("sandbox");
    const facts = (t.raw("facts") as string[]) ?? [];
    const [step, setStep] = useState(0);
    const [factIdx, setFactIdx] = useState(() =>
        Math.floor(Math.random() * Math.max(1, facts.length)),
    );

    // Chạy vòng 4 tiêu chí + đổi fact khi đang phân tích (hiệu ứng, không tính thật).
    useEffect(() => {
        if (!analyzing) return;
        const crit = setInterval(
            () => setStep((s) => (s + 1) % (CRIT_KEYS.length + 1)),
            750,
        );
        const fact = setInterval(
            () => setFactIdx((i) => (i + 1) % Math.max(1, facts.length)),
            3500,
        );
        return () => {
            clearInterval(crit);
            clearInterval(fact);
        };
    }, [analyzing, facts.length]);

    return (
        <Dialog
            open={analyzing}
            sx={{
                "& .MuiDialog-container": {
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    backdropFilter: "blur(4px)",
                },
                "& .MuiPaper-root": {
                    backgroundColor: "var(--color-bgc-app)",
                    color: "var(--color-text-contrast)",
                    borderRadius: "20px",
                    boxShadow: "none",
                    margin: 0,
                },
            }}
        >
            <div className="flex w-[340px] max-w-full flex-col items-center gap-4 p-7 text-center">
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <span
                        aria-hidden
                        className="absolute inset-0 animate-spin rounded-full"
                        style={{
                            background: `conic-gradient(${accent} 0deg, ${accent} 110deg, color-mix(in srgb, ${accent} 16%, transparent) 110deg)`,
                        }}
                    />
                    <span className="bg-bgc-app relative flex h-16 w-16 items-center justify-center rounded-full text-2xl"> </span>
                </div>

                <div>
                    <h2 className="text-text-contrast text-base font-bold">
                        {t("analyzingTitle")}
                    </h2>
                    <p className="text-text-muted mt-1 text-xs">
                        {t("analyzingHint")}
                    </p>
                </div>

                <ul className="w-full space-y-2">
                    {CRIT_KEYS.map((key, i) => {
                        const done = i < step;
                        const activeNow = i === step;
                        return (
                            <li
                                key={key}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                                    done || activeNow
                                        ? "border-transparent"
                                        : "border-bdc-primary opacity-60",
                                )}
                                style={
                                    done || activeNow
                                        ? {
                                            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                                        }
                                        : undefined
                                }
                            >
                                {done ? (
                                    <Check
                                        className="h-4 w-4 shrink-0"
                                        style={{ color: accent }}
                                        strokeWidth={3}
                                    />
                                ) : activeNow ? (
                                    <Loader2
                                        className="h-4 w-4 shrink-0 animate-spin"
                                        style={{ color: accent }}
                                    />
                                ) : (
                                    <span className="border-bdc-muted h-4 w-4 shrink-0 rounded-full border" />
                                )}
                                <span className="text-text-contrast font-medium">
                                    {t(key)}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                {facts.length > 0 && (
                    <div className="bg-bgc-page w-full rounded-xl p-3 text-left">
                        <p
                            className="text-[10px] font-bold tracking-wide uppercase"
                            style={{ color: accent }}
                        >
                            {t("factLabel")}
                        </p>
                        <p className="text-text-muted mt-1 text-xs leading-relaxed">
                            {facts[factIdx]}
                        </p>
                    </div>
                )}
            </div>
        </Dialog>
    );
}

export default SandboxAnalyzingOverlay;
