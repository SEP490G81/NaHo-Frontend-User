"use client";

import React from "react";
import { Button, CircularProgress, Divider } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { useTranslations } from "next-intl";
import { PersonaSummaryCardProps } from "../types/persona.setup.type";
import PersonaAvatarBadge from "./persona.avatar.badge";
import {
    getFormalityLevelLabel,
    getMarugotoLevelLabel,
} from "../utils/persona.setup.util";

const PersonaSummaryCard = ({
    selectedPersona,
    marugotoLevel,
    formalityLevel,
    speechSpeed,
    showSampleAnswers,
    isStarting,
    onStartChat,
}: PersonaSummaryCardProps) => {
    const t = useTranslations("dialogueSetup");

    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-col rounded-2xl border p-5 shadow-xs lg:sticky lg:top-[calc(var(--header-height,69px)+20px)]">
            <h3 className="text-text-contrast border-bdc-primary border-b pb-3 text-base font-bold">
                {t("summaryTitle")}
            </h3>

            {/* Persona Info */}
            <div className="py-4">
                {selectedPersona ? (
                    <div className="flex items-center gap-3">
                        <PersonaAvatarBadge
                            name={selectedPersona.name}
                            avatarUrl={selectedPersona.avatarFile?.accessUrl}
                            size={48}
                        />
                        <div className="min-w-0 flex-1">
                            <h4 className="text-text-contrast truncate text-sm font-bold">
                                {selectedPersona.name}
                            </h4>
                            {selectedPersona.voiceName && (
                                <p className="text-text-muted mt-0.5 flex items-center gap-1 text-xs">
                                    <GraphicEqRoundedIcon
                                        sx={{ fontSize: 13 }}
                                    />
                                    <span className="truncate">
                                        {selectedPersona.voiceName}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-text-muted text-xs italic">
                        {t("companionUnavailable")}
                    </p>
                )}
            </div>

            <Divider sx={{ borderColor: "var(--color-bdc-primary)" }} />

            {/* Configuration Details */}
            <div className="space-y-2.5 py-4 text-xs">
                <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1.5">
                        <SchoolOutlinedIcon sx={{ fontSize: 15 }} />
                        {t("summaryLevel")}
                    </span>
                    <span className="text-text-contrast font-bold">
                        {getMarugotoLevelLabel(marugotoLevel)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1.5">
                        <RecordVoiceOverOutlinedIcon sx={{ fontSize: 15 }} />
                        {t("summaryStyle")}
                    </span>
                    <span className="text-text-contrast font-bold">
                        {getFormalityLevelLabel(formalityLevel)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1.5">
                        <SpeedRoundedIcon sx={{ fontSize: 15 }} />
                        {t("summarySpeed")}
                    </span>
                    <span className="text-text-contrast font-bold">
                        {speechSpeed.toFixed(2)}x
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1.5">
                        <LightbulbOutlinedIcon sx={{ fontSize: 15 }} />
                        {t("hintsTitle")}
                    </span>
                    <span
                        className={
                            showSampleAnswers
                                ? "font-bold text-emerald-600 dark:text-emerald-400"
                                : "text-text-muted font-medium"
                        }
                    >
                        {showSampleAnswers ? "Bật" : "Tắt"}
                    </span>
                </div>
            </div>

            <Divider sx={{ borderColor: "var(--color-bdc-primary)" }} />

            {/* Start Button */}
            <div className="pt-4">
                <Button
                    fullWidth
                    variant="contained"
                    disabled={!selectedPersona || isStarting}
                    onClick={onStartChat}
                    startIcon={
                        isStarting ? (
                            <CircularProgress size={18} color="inherit" />
                        ) : (
                            <PlayArrowRoundedIcon />
                        )
                    }
                    sx={{
                        py: 1.3,
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "14px",
                        textTransform: "none",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#ffffff",
                        boxShadow: "0 4px 14px 0 rgba(255, 153, 172, 0.4)",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {isStarting ? t("starting") : t("startButton")}
                </Button>
                <p className="text-text-muted mt-2 text-center text-[11px]">
                    {t("startHint")}
                </p>
            </div>
        </div>
    );
};

export default PersonaSummaryCard;
