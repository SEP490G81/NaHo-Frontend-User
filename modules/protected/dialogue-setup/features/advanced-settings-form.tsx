"use client";
import { useState } from "react";
import { MessagesSquare } from "lucide-react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { useTranslations } from "next-intl";
import {
  useChatStore,
  type ChatKeigo,
  type ChatTone,
} from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";

interface AdvancedSettingsFormProps {
  companionId: string;
}

export function AdvancedSettingsForm({ companionId }: AdvancedSettingsFormProps) {
  const t = useTranslations("dialogueSetup");
  const router = useRouter();
  const setConfig = useChatStore((s) => s.setConfig);

  const [tone, setTone] = useState<ChatTone>("casual");
  const [keigo, setKeigo] = useState<ChatKeigo>("auto");
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showHints, setShowHints] = useState(true);

  const handleStart = () => {
    setConfig({
      companionId,
      tone,
      keigo,
      voiceSpeed,
      showTranslation,
      showHints,
    });
    router.push("/live-chatroom");
  };

  return (
    <div className="rounded-xl border border-bdc-primary bg-bgc-app p-5 sm:p-6 shadow-sm">
      <h2 className="text-base font-semibold text-text-contrast">
        {t("advancedTitle")}
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        {t("advancedSubtitle")}
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        {/* Tone */}
        <div className="space-y-2 flex flex-col justify-start">
          <span className="text-sm font-medium text-text-contrast">{t("toneLabel")}</span>
          <ToggleButtonGroup
            value={tone}
            exclusive
            onChange={(e, v) => v && setTone(v as ChatTone)}
            size="small"
            className="justify-start gap-2"
          >
            <ToggleButton
              value="casual"
              className="!rounded-md border border-bdc-primary !px-3 !py-1.5 !text-xs !font-medium !text-text-contrast !capitalize [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight"
            >
              {t("toneCasual")}
            </ToggleButton>
            <ToggleButton
              value="business"
              className="!rounded-md border border-bdc-primary !px-3 !py-1.5 !text-xs !font-medium !text-text-contrast !capitalize [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight"
            >
              {t("toneBusiness")}
            </ToggleButton>
            <ToggleButton
              value="interview"
              className="!rounded-md border border-bdc-primary !px-3 !py-1.5 !text-xs !font-medium !text-text-contrast !capitalize [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight"
            >
              {t("toneInterview")}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Keigo */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-text-contrast block mb-1">
            {t("keigoLabel")}
          </span>
          <FormControl fullWidth size="small">
            <Select
              value={keigo}
              onChange={(e) => setKeigo(e.target.value as ChatKeigo)}
              className="text-text-contrast bg-bgc-app"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-bdc-primary)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-bgc-highlight)" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-bgc-highlight)" }
              }}
            >
              <MenuItem value="auto">{t("keigoAuto")}</MenuItem>
              <MenuItem value="sonkeigo">{t("keigoSonkeigo")}</MenuItem>
              <MenuItem value="kenjougo">{t("keigoKenjougo")}</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Voice speed */}
        <div className="space-y-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-contrast">
              {t("speedLabel")}
            </span>
            <span className="rounded-md bg-bgc-page px-2 py-0.5 text-xs font-semibold text-bgc-highlight">
              {voiceSpeed.toFixed(1)}x
            </span>
          </div>
          <Slider
            value={voiceSpeed}
            min={0.8}
            max={1.5}
            step={0.1}
            onChange={(e, v) => setVoiceSpeed(v as number)}
            color="primary"
          />
          <div className="flex justify-between text-[11px] text-text-muted">
            <span>0.8x ({t("speedSlow")})</span>
            <span>1.5x ({t("speedFast")})</span>
          </div>
        </div>

        {/* Toggles */}
        <label className="flex cursor-pointer items-start justify-between gap-3 rounded-md border border-bdc-primary bg-bgc-page p-3">
          <span className="flex-1">
            <span className="block text-sm font-medium text-text-contrast">
              {t("translationTitle")}
            </span>
            <span className="block text-xs text-text-muted">
              {t("translationDesc")}
            </span>
          </span>
          <Switch
            checked={showTranslation}
            onChange={(e) => setShowTranslation(e.target.checked)}
            color="primary"
          />
        </label>

        <label className="flex cursor-pointer items-start justify-between gap-3 rounded-md border border-bdc-primary bg-bgc-page p-3">
          <span className="flex-1">
            <span className="block text-sm font-medium text-text-contrast">
              {t("hintsTitle")}
            </span>
            <span className="block text-xs text-text-muted">
              {t("hintsDesc")}
            </span>
          </span>
          <Switch
            checked={showHints}
            onChange={(e) => setShowHints(e.target.checked)}
            color="primary"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end border-t border-bdc-primary pt-4">
        <Button
          onClick={handleStart}
          variant="contained"
          color="primary"
          className="!h-10 !rounded-lg !px-5 font-bold text-white hover:opacity-90 capitalize"
          startIcon={<MessagesSquare className="h-4 w-4" />}
        >
          {t("startButton")}
        </Button>
      </div>
    </div>
  );
}

export default AdvancedSettingsForm;
