"use client";
import {
    FormControl,
    MenuItem,
    Select,
    Slider,
    Switch,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { type ChatKeigo, type ChatTone } from "@/store/chatStore";

interface AdvancedSettingsFormProps {
    tone: ChatTone;
    keigo: ChatKeigo;
    voiceSpeed: number;
    showHints: boolean;
    onToneChange: (v: ChatTone) => void;
    onKeigoChange: (v: ChatKeigo) => void;
    onVoiceSpeedChange: (v: number) => void;
    onShowHintsChange: (v: boolean) => void;
}

const TOGGLE_CLASS =
    "border-bdc-primary !text-text-contrast [&.Mui-selected]:!border-bgc-highlight [&.Mui-selected]:!bg-bgc-highlight/15 [&.Mui-selected]:!text-bgc-highlight !rounded-md border !px-3 !py-1.5 !text-xs !font-medium !capitalize";

export function AdvancedSettingsForm({
    tone,
    keigo,
    voiceSpeed,
    showHints,
    onToneChange,
    onKeigoChange,
    onVoiceSpeedChange,
    onShowHintsChange,
}: AdvancedSettingsFormProps) {
    const t = useTranslations("dialogueSetup");

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="text-text-contrast text-base font-semibold">
                {t("advancedTitle")}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
                {t("advancedSubtitle")}
            </p>

            <div className="mt-5 grid gap-6 lg:grid-cols-2">
                {/* Tone */}
                <div className="flex flex-col justify-start space-y-2">
                    <span className="text-text-contrast text-sm font-medium">
                        {t("toneLabel")}
                    </span>
                    <ToggleButtonGroup
                        value={tone}
                        exclusive
                        onChange={(_e, v) => v && onToneChange(v as ChatTone)}
                        size="small"
                        className="justify-start gap-2"
                    >
                        <ToggleButton value="casual" className={TOGGLE_CLASS}>
                            {t("toneCasual")}
                        </ToggleButton>
                        <ToggleButton value="business" className={TOGGLE_CLASS}>
                            {t("toneBusiness")}
                        </ToggleButton>
                        <ToggleButton value="interview" className={TOGGLE_CLASS}>
                            {t("toneInterview")}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {/* Keigo */}
                <div className="space-y-2">
                    <span className="text-text-contrast mb-1 block text-sm font-medium">
                        {t("keigoLabel")}
                    </span>
                    <FormControl fullWidth size="small">
                        <Select
                            value={keigo}
                            onChange={(e) =>
                                onKeigoChange(e.target.value as ChatKeigo)
                            }
                            className="text-text-contrast bg-bgc-app"
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bdc-primary)",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bgc-highlight)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "var(--color-bgc-highlight)",
                                    },
                            }}
                        >
                            <MenuItem value="auto">{t("keigoAuto")}</MenuItem>
                            <MenuItem value="sonkeigo">
                                {t("keigoSonkeigo")}
                            </MenuItem>
                            <MenuItem value="kenjougo">
                                {t("keigoKenjougo")}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Voice speed */}
                <div className="space-y-2 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <span className="text-text-contrast text-sm font-medium">
                            {t("speedLabel")}
                        </span>
                        <span className="bg-bgc-page text-bgc-highlight rounded-md px-2 py-0.5 text-xs font-semibold">
                            {voiceSpeed.toFixed(1)}x
                        </span>
                    </div>
                    <Slider
                        value={voiceSpeed}
                        min={0.8}
                        max={1.5}
                        step={0.1}
                        onChange={(_e, v) => onVoiceSpeedChange(v as number)}
                        color="primary"
                    />
                    <div className="text-text-muted flex justify-between text-[11px]">
                        <span>0.8x ({t("speedSlow")})</span>
                        <span>1.5x ({t("speedFast")})</span>
                    </div>
                </div>

                {/* Hints toggle */}
                <label className="border-bdc-primary bg-bgc-page/50 flex cursor-pointer items-start justify-between gap-3 rounded-md border p-3 lg:col-span-2">
                    <span className="flex-1">
                        <span className="text-text-contrast block text-sm font-medium">
                            {t("hintsTitle")}
                        </span>
                        <span className="text-text-muted block text-xs">
                            {t("hintsDesc")}
                        </span>
                    </span>
                    <Switch
                        checked={showHints}
                        onChange={(e) => onShowHintsChange(e.target.checked)}
                        color="primary"
                    />
                </label>
            </div>
        </div>
    );
}

export default AdvancedSettingsForm;
