"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Mic, RotateCcw } from "lucide-react";
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
    accent: string;
}

export function SandboxStep1({
    rules,
    volume,
    micStatus,
    startMicTest,
    resetMicTest,
    setStep,
    accent,
}: SandboxStep1Props) {
    const t = useTranslations("sandbox");

    return (
        <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-6">
                <h2 className="text-text-contrast text-lg font-semibold">
                    {t("guideTitle")}
                </h2>
                <p className="text-text-muted mt-1 text-sm">
                    {t("guideSubtitle")}
                </p>
                <ol className="mt-4 space-y-3 text-sm">
                    {rules.map((rule, i) => (
                        <li
                            key={i}
                            className="bg-bgc-page flex items-start gap-3 rounded-lg p-3"
                        >
                            <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                                {i + 1}
                            </span>
                            <span className="text-text-contrast leading-relaxed">
                                {rule}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <aside className="border-bdc-primary bg-bgc-app rounded-2xl border p-6">
                <h2 className="text-text-contrast text-lg font-semibold">
                    {t("micTestTitle")}
                </h2>
                <p className="text-text-muted mt-1 text-sm">
                    {t("micTestSubtitle")}
                </p>

                <div className="my-5">
                    <MicVolumeGauge
                        level={volume}
                        active={micStatus === "testing"}
                    />
                </div>

                {micStatus === "idle" && (
                    <Button
                        onClick={startMicTest}
                        variant="contained"
                        startIcon={<Mic className="h-4 w-4" />}
                        fullWidth
                        sx={{
                            textTransform: "none",
                            backgroundColor: accent,
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
                        startIcon={
                            <CircularProgress size={16} color="inherit" />
                        }
                        sx={{
                            textTransform: "none",
                            backgroundColor: accent,
                            opacity: 0.7,
                        }}
                    >
                        {t("micTestingBtn")}
                    </Button>
                )}

                {micStatus === "good" && (
                    <div className="space-y-3 text-center">
                        <p className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold">
                            <CheckCircle2 className="h-4 w-4" />
                            {t("micStatusGood")}
                        </p>
                        <Button
                            onClick={() => setStep(2)}
                            variant="contained"
                            fullWidth
                            sx={{
                                textTransform: "none",
                                backgroundColor: accent,
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
                        <p className="bg-bgc-error/15 text-bgc-error inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold">
                            {t("micStatusPoor")}
                        </p>
                        <p className="text-text-muted text-xs">
                            {t("micStatusPoorTip")}
                        </p>
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
