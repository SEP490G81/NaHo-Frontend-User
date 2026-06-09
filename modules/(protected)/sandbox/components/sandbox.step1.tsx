"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Mic, CheckCircle2, RotateCcw } from "lucide-react";
import { Button, CircularProgress } from "@mui/material";
import { SandboxStep } from "../types/sandbox.type";
import MicVolumeGauge from "./mic.volume.gauge";

interface SandboxStep1Props {
    rules: string[];
    volume: number;
    micStatus: string;
    startMicTest: () => void;
    resetMicTest: () => void;
    setStep: (step: SandboxStep) => void;
    furigana: boolean;
}


export function SandboxStep1({
    rules,
    volume,
    micStatus,
    startMicTest,
    resetMicTest,
    setStep,
    furigana,
}: SandboxStep1Props) {
    const t = useTranslations("page.sandbox");

    return (
        <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-6">
                <h2 className="text-lg font-semibold text-text-contrast">{t("guideTitle")}</h2>
                <p className="mt-1 text-sm text-text-muted">{t("guideSubtitle")}</p>
                <ol className="mt-4 space-y-3 text-sm">
                    {rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg bg-bgc-page p-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bgc-highlight/15 text-xs font-bold text-bgc-highlight">
                                {i + 1}
                            </span>
                            <span className="leading-relaxed text-text-contrast">{rule}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <aside className="rounded-2xl border border-bdc-primary bg-bgc-app p-6">
                <h2 className="text-lg font-semibold text-text-contrast">{t("micTestTitle")}</h2>
                <p className="mt-1 text-sm text-text-muted">{t("micTestSubtitle")}</p>

                <div className="my-5">
                    <MicVolumeGauge level={volume} active={micStatus === "testing"} />
                </div>

                {micStatus === "idle" && (
                    <Button
                        onClick={startMicTest}
                        variant="contained"
                        startIcon={<Mic className="h-4 w-4" />}
                        fullWidth
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-pure)",
                            fontWeight: "bold",
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        {t("micTestBtn")}
                    </Button>
                )}

                {micStatus === "testing" && (
                    <Button
                        disabled
                        variant="contained"
                        fullWidth
                        startIcon={<CircularProgress size={16} color="inherit" />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.7,
                        }}
                    >
                        {t("micTestingBtn")}
                    </Button>
                )}

                {micStatus === "good" && (
                    <div className="space-y-3 text-center">
                        <p className="inline-flex items-center gap-2 rounded-full bg-bgc-highlight/15 px-4 py-1 text-sm font-semibold text-bgc-highlight">
                            <CheckCircle2 className="h-4 w-4" />
                            {t("micStatusGood")}
                        </p>
                        <Button
                            onClick={() => setStep(2)}
                            variant="contained"
                            fullWidth
                            sx={{
                                textTransform: "none",
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "var(--color-text-pure)",
                                fontWeight: "bold",
                                "&:hover": { opacity: 0.9 },
                            }}
                        >
                            {t("startPracticeBtn")}
                        </Button>
                    </div>
                )}

                {micStatus === "poor" && (
                    <div className="space-y-3 text-center">
                        <p className="inline-flex items-center gap-2 rounded-full bg-bgc-error/15 px-4 py-1 text-sm font-semibold text-bgc-error">
                            {t("micStatusPoor")}
                        </p>
                        <p className="text-xs text-text-muted">{t("micStatusPoorTip")}</p>
                        <Button
                            onClick={resetMicTest}
                            variant="outlined"
                            fullWidth
                            startIcon={<RotateCcw className="h-4 w-4" />}
                            sx={{
                                textTransform: "none",
                                borderColor: "var(--color-bdc-muted)",
                                color: "var(--color-text-contrast)",
                                "&:hover": {
                                    borderColor: "var(--color-bdc-primary)",
                                    backgroundColor: "var(--color-hbgc-app)",
                                },
                            }}
                        >
                            {t("retryBtn")}
                        </Button>
                    </div>
                )}
            </aside>
        </section>
    );
}

export default SandboxStep1;
