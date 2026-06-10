"use client";
import React from "react";
import { BarChart3, RotateCcw } from "lucide-react";
import { Button } from "@mui/material";
import PlaybackPlayer from "../../sandbox/features/playback.player";
import CustomQuestionCard from "./custom.question.card";
import { useTranslations } from "next-intl";
import { useSandboxCustom } from "../provider/sandbox-custom.context";

interface SandboxStep3Props {
  questionJp: string;
  hintVi?: string;
  showFurigana: boolean;
  elapsed: number;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  retrySpeaking: () => void;
  onNext: () => void;
}

export function SandboxStep3({
  questionJp,
  hintVi,
  showFurigana,
  elapsed,
  playing,
  setPlaying,
  retrySpeaking,
  onNext,
}: SandboxStep3Props) {
  const t = useTranslations("page.sandboxCustom");
  const { audioUrl } = useSandboxCustom();

  return (
    <section className="space-y-5 animate-fade-in">
      <CustomQuestionCard
        jp={questionJp}
        vi={hintVi}
        showFurigana={showFurigana}
      />

      <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-6">
        <h2 className="text-lg font-semibold text-text-contrast">{t("playbackTitle")}</h2>
        <p className="mt-1 text-sm text-text-muted">{t("playbackSubtitle")}</p>

        <div className="mt-4">
          <PlaybackPlayer
            durationSec={Math.max(elapsed, 1)}
            playing={playing}
            onToggle={() => setPlaying(!playing)}
            audioUrl={audioUrl}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <Button
            variant="outlined"
            onClick={() => setPlaying(!playing)}
            sx={{
              textTransform: "none",
              borderColor: "var(--color-bdc-muted)",
              color: "var(--color-text-contrast)",
              fontWeight: "semibold",
              "&:hover": {
                borderColor: "var(--color-bdc-primary)",
                backgroundColor: "var(--color-hbgc-app)",
              },
            }}
          >
            {playing ? t("playbackPause") : t("playbackPlay")}
          </Button>
          <Button
            variant="outlined"
            onClick={retrySpeaking}
            startIcon={<RotateCcw className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              borderColor: "var(--color-bdc-muted)",
              color: "var(--color-text-contrast)",
              fontWeight: "semibold",
              "&:hover": {
                borderColor: "var(--color-bdc-primary)",
                backgroundColor: "var(--color-hbgc-app)",
              },
            }}
          >
            {t("playbackRetry")}
          </Button>
          <Button
            onClick={onNext}
            variant="contained"
            startIcon={<BarChart3 className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              backgroundColor: "var(--color-bgc-highlight)",
              color: "var(--color-text-pure)",
              fontWeight: "bold",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {t("playbackSubmit")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SandboxStep3;
