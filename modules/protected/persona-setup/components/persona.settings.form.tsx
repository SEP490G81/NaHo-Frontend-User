"use client";

import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Switch,
} from "@mui/material";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useTranslations } from "next-intl";
import {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import {
    FORMALITY_LEVEL_OPTIONS,
    MARUGOTO_LEVEL_OPTIONS,
    MAX_SPEED,
    MIN_SPEED,
    SPEED_STEP,
} from "../constants/persona.setup.constant";
import { PersonaSettingsFormProps } from "../types/persona.setup.type";

const SPEED_MARKS = [
    { value: 0.75, label: "0.75x" },
    { value: 1.0, label: "1.0x" },
    { value: 1.25, label: "1.25x" },
    { value: 1.5, label: "1.5x" },
];

const PersonaSettingsForm = ({
    selectedPersona,
    marugotoLevel,
    formalityLevel,
    speechSpeed,
    showSampleAnswers,
    onMarugotoLevelChange,
    onFormalityLevelChange,
    onSpeedChange,
    onSampleAnswersChange,
    onResetDefaults,
}: PersonaSettingsFormProps) => {
    const t = useTranslations("dialogueSetup");

    const defaultMarugoto =
        selectedPersona?.defaultMarugotoLevel ||
        selectedPersona?.suggestedConversationStyle?.marugotoLevel ||
        "STARTER_A1";
    const defaultFormality =
        selectedPersona?.defaultFormalityLevel ||
        selectedPersona?.suggestedConversationStyle?.formalityLevel ||
        "NEUTRAL";

    const isDefault =
        marugotoLevel === defaultMarugoto && formalityLevel === defaultFormality;

    return (
        <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-bdc-primary pb-3">
                <div>
                    <h3 className="text-text-contrast text-base font-bold">
                        {t("advancedTitle")}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">
                        {t("advancedSubtitle")}
                    </p>
                </div>
                {onResetDefaults && (
                    <button
                        type="button"
                        onClick={onResetDefaults}
                        disabled={isDefault}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                            isDefault
                                ? "opacity-50 cursor-not-allowed border-bdc-primary text-text-muted bg-transparent"
                                : "border-bdc-primary bg-hbgc-app hover:bg-bgc-highlight/10 text-text-contrast hover:text-text-highlight cursor-pointer"
                        }`}
                        title={t("resetDefaults")}
                    >
                        <RestartAltRoundedIcon sx={{ fontSize: 16 }} />
                        <span>{t("resetDefaults")}</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Select 1: Marugoto Level */}
                <FormControl fullWidth size="small">
                    <InputLabel id="marugoto-level-label">
                        <span className="flex items-center gap-1.5 font-semibold">
                            <SchoolOutlinedIcon sx={{ fontSize: 16 }} />
                            {t("levelLabel")}
                        </span>
                    </InputLabel>
                    <Select
                        labelId="marugoto-level-label"
                        value={marugotoLevel}
                        label={t("levelLabel")}
                        onChange={(e) =>
                            onMarugotoLevelChange(e.target.value as MarugotoLevel)
                        }
                        sx={{ borderRadius: "12px" }}
                    >
                        {MARUGOTO_LEVEL_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs rounded-md px-1.5 py-0.5 bg-hbgc-app border border-bdc-primary">
                                        {opt.levelCode}
                                    </span>
                                    <span className="text-sm">{opt.label}</span>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select 2: Formality Level */}
                <FormControl fullWidth size="small">
                    <InputLabel id="formality-level-label">
                        <span className="flex items-center gap-1.5 font-semibold">
                            <RecordVoiceOverOutlinedIcon sx={{ fontSize: 16 }} />
                            {t("styleLabel")}
                        </span>
                    </InputLabel>
                    <Select
                        labelId="formality-level-label"
                        value={formalityLevel}
                        label={t("styleLabel")}
                        onChange={(e) =>
                            onFormalityLevelChange(e.target.value as FormalityLevel)
                        }
                        sx={{ borderRadius: "12px" }}
                    >
                        {FORMALITY_LEVEL_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                <div>
                                    <p className="text-sm font-semibold">{opt.label}</p>
                                    <p className="text-text-muted text-[11px]">{opt.description}</p>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/* Slider: AI Speech Speed */}
            <div className="rounded-xl bg-hbgc-app/60 border border-bdc-primary p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <SpeedRoundedIcon sx={{ fontSize: 18 }} className="text-text-muted" />
                        <span className="text-text-contrast text-xs font-bold uppercase tracking-wider">
                            {t("speedLabel")}
                        </span>
                    </div>
                    <span className="text-text-highlight text-xs font-extrabold bg-bgc-highlight/15 px-2 py-0.5 rounded-md">
                        {speechSpeed.toFixed(2)}x
                    </span>
                </div>
                <div className="px-2 pt-2">
                    <Slider
                        value={speechSpeed}
                        min={MIN_SPEED}
                        max={MAX_SPEED}
                        step={SPEED_STEP}
                        marks={SPEED_MARKS}
                        onChange={(_, value) => onSpeedChange(value as number)}
                        sx={{ color: "var(--color-bgc-highlight)" }}
                    />
                </div>
            </div>

            {/* Switch: Sample answers toggle */}
            <div className="flex items-center justify-between rounded-xl bg-hbgc-app/60 border border-bdc-primary p-4">
                <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                        <LightbulbOutlinedIcon sx={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <h4 className="text-text-contrast text-sm font-bold">{t("hintsTitle")}</h4>
                        <p className="text-text-muted text-xs leading-relaxed mt-0.5">{t("hintsDesc")}</p>
                    </div>
                </div>
                <Switch
                    checked={showSampleAnswers}
                    onChange={(e) => onSampleAnswersChange(e.target.checked)}
                    sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--color-bgc-highlight)" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "var(--color-bgc-highlight)" },
                    }}
                />
            </div>
        </div>
    );
};

export default PersonaSettingsForm;
