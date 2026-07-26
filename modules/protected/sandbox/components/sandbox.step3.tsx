"use client";
import React from "react";
import { BarChart3, Mic, Pause, Play } from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import PlaybackPlayer from "../features/playback.player";
import { useSandbox } from "../provider/sandbox.context";

interface SandboxStep3Props {
    elapsed: number;
    playing: boolean;
    setPlaying: (playing: boolean) => void;
    retrySpeaking: () => void;
    onNext: () => void;
    accent: string;
}

export function SandboxStep3({
    elapsed,
    playing,
    setPlaying,
    retrySpeaking,
    onNext,
    accent,
}: SandboxStep3Props) {
    const t = useTranslations("sandbox");
    const { audioUrl } = useSandbox();

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-2xl border p-6">
            <h2 className="text-text-contrast text-lg font-semibold">
                {t("playbackTitle")}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
                {t("playbackSubtitle")}
            </p>

            <div className="mt-4">
                <PlaybackPlayer
                    durationSec={Math.max(elapsed, 1)}
                    playing={playing}
                    onToggle={() => setPlaying(!playing)}
                    audioUrl={audioUrl}
                    accent={accent}
                />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Ghi âm lại — bên trái, tông trung tính, icon mic (khác hẳn "Nghe lại"). */}
                <Button
                    variant="outlined"
                    onClick={retrySpeaking}
                    startIcon={<Mic className="h-4 w-4" />}
                    sx={{
                        textTransform: "none",
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-muted)",
                        fontWeight: 600,
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("playbackRetry")}
                </Button>

                <div className="flex-1" />

                {/* Nghe lại — tô accent + icon play/pause, tách rõ khỏi "Ghi âm lại". */}
                <Button
                    variant="outlined"
                    onClick={() => setPlaying(!playing)}
                    startIcon={
                        playing ? (
                            <Pause className="h-4 w-4" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )
                    }
                    sx={{
                        textTransform: "none",
                        borderColor: accent,
                        color: accent,
                        fontWeight: 700,
                        backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                        "&:hover": {
                            backgroundColor: `color-mix(in srgb, ${accent} 16%, transparent)`,
                            borderColor: accent,
                        },
                    }}
                >
                    {playing ? t("playbackPause") : t("playbackPlay")}
                </Button>

                <Button
                    onClick={onNext}
                    variant="contained"
                    startIcon={<BarChart3 className="h-4 w-4" />}
                    sx={{
                        textTransform: "none",
                        backgroundColor: accent,
                        color: "var(--color-text-pure)",
                        fontWeight: 700,
                        "&:hover": {
                            backgroundColor: accent,
                            filter: "brightness(0.95)",
                        },
                    }}
                >
                    {t("playbackSubmit")}
                </Button>
            </div>
        </section>
    );
}

export default SandboxStep3;
