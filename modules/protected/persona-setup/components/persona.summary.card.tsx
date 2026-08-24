"use client";

import React from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    LinearProgress,
    Tooltip,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useChatStore } from "@/store/chatStore";
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
    dailyLimit = 3,
    dailyUsed = 0,
    isDailyLimitReached = false,
    maxConcurrent = 1,
    inProgressSessionsCount = 0,
    isConcurrentLimitReached = false,
    planName = "Miễn phí (Free)",
    isLoadingUsage = false,
    onStartChat,
}: PersonaSummaryCardProps) => {
    const t = useTranslations("personaSetup");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const remainingDaily = Math.max(0, dailyLimit - dailyUsed);
    const usagePercent = Math.min(
        100,
        Math.round((dailyUsed / Math.max(1, dailyLimit)) * 100),
    );

    const isStartDisabled =
        !selectedPersona ||
        isStarting ||
        isDailyLimitReached ||
        isConcurrentLimitReached;

    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-col rounded-2xl border p-5 shadow-xs lg:sticky lg:top-[calc(var(--header-height,69px)+20px)]">
            {/* Header with Title & Current Plan */}
            <div className="border-bdc-primary flex items-center justify-between border-b pb-3">
                <h3 className="text-text-contrast text-base font-bold">
                    {t("summaryTitle")}
                </h3>
                <Chip
                    icon={
                        <WorkspacePremiumOutlinedIcon sx={{ fontSize: 14 }} />
                    }
                    label={planName}
                    size="small"
                    sx={{
                        height: 22,
                        fontSize: "11px",
                        fontWeight: 700,
                        borderRadius: "6px",
                        backgroundColor: "var(--color-bgc-highlight)/15",
                        color: "var(--color-text-highlight)",
                        "& .MuiChip-icon": {
                            color: "var(--color-text-highlight)",
                            fontSize: 13,
                        },
                    }}
                />
            </div>

            {/* Persona Info */}
            <div className="py-3.5">
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
            <div className="space-y-2.5 py-3 text-xs">
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

                <div className="flex items-center justify-between">
                    <span className="text-text-muted flex items-center gap-1.5">
                        <VolumeUpOutlinedIcon sx={{ fontSize: 15 }} />
                        {t("aiAudioTitle")}
                    </span>
                    <span
                        className={
                            autoPlayAudio
                                ? "font-bold text-sky-600 dark:text-sky-400"
                                : "text-text-muted font-medium"
                        }
                    >
                        {autoPlayAudio ? t("autoMode") : t("manualMode")}
                    </span>
                </div>
            </div>

            <Divider sx={{ borderColor: "var(--color-bdc-primary)" }} />

            {/* Quota & Limit Tracking Section */}
            <div className="space-y-2.5 py-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted font-medium">
                        Lượt tạo phiên hôm nay
                    </span>
                    <span className="text-text-contrast font-bold">
                        {isLoadingUsage
                            ? "..."
                            : `${dailyUsed} / ${dailyLimit} lượt`}
                    </span>
                </div>

                <Box sx={{ width: "100%" }}>
                    <LinearProgress
                        variant={
                            isLoadingUsage ? "indeterminate" : "determinate"
                        }
                        value={usagePercent}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "var(--color-hbgc-app)",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: isDailyLimitReached
                                    ? "var(--color-text-error, #ef4444)"
                                    : "var(--color-bgc-highlight)",
                                borderRadius: 3,
                            },
                        }}
                    />
                </Box>

                <div className="flex items-center justify-between text-[11px]">
                    <span
                        className={
                            isDailyLimitReached
                                ? "font-bold text-red-500"
                                : "text-text-muted"
                        }
                    >
                        {isDailyLimitReached
                            ? "Đã hết lượt hôm nay"
                            : `Còn lại: ${remainingDaily} lượt`}
                    </span>

                    {/* Active In-Progress count */}
                    <Tooltip
                        title={`Số phiên hội thoại đang dở chưa kết thúc (tối đa ${maxConcurrent} phiên cùng lúc)`}
                        arrow
                    >
                        <span
                            className={
                                isConcurrentLimitReached
                                    ? "flex items-center gap-1 font-bold text-amber-500"
                                    : "text-text-muted flex items-center gap-1"
                            }
                        >
                            <HourglassEmptyRoundedIcon sx={{ fontSize: 13 }} />
                            {`Đang dở: ${inProgressSessionsCount}/${maxConcurrent}`}
                        </span>
                    </Tooltip>
                </div>
            </div>

            {/* Warning Alert: Daily Limit Reached */}
            {isDailyLimitReached && (
                <div className="pb-2">
                    <Alert
                        severity="error"
                        sx={{
                            fontSize: "12px",
                            borderRadius: "10px",
                            padding: "6px 12px",
                        }}
                    >
                        {t("quotaExhaustedMsg") ||
                            "Bạn đã sử dụng hết số lượt tạo phiên hôm nay."}
                    </Alert>
                </div>
            )}

            {/* Warning Alert: Concurrent In-Progress Limit Reached */}
            {!isDailyLimitReached && isConcurrentLimitReached && (
                <div className="pb-2">
                    <Alert
                        severity="warning"
                        sx={{
                            fontSize: "12px",
                            borderRadius: "10px",
                            padding: "6px 12px",
                        }}
                    >
                        {t("concurrentLimitExceededMsg", {
                            count: inProgressSessionsCount,
                            max: maxConcurrent,
                        })}
                    </Alert>
                </div>
            )}

            {/* Action Buttons: Upgrade Plan (if quota exceeded) & Start Button */}
            <div className="flex flex-col gap-3 pt-3">
                {isDailyLimitReached && (
                    <Button
                        fullWidth
                        component={Link}
                        href="/settings/billing"
                        variant="contained"
                        startIcon={<AutoAwesomeRoundedIcon />}
                        sx={{
                            py: 1.2,
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "13px",
                            textTransform: "none",
                            background:
                                "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
                            color: "#ffffff",
                            boxShadow: "0 4px 14px 0 rgba(245, 158, 11, 0.35)",
                            "&:hover": {
                                opacity: 0.95,
                            },
                        }}
                    >
                        {t("quotaUpgradeBtn") || "Nâng cấp gói dịch vụ"}
                    </Button>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    disabled={isStartDisabled}
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
                        boxShadow: isStartDisabled
                            ? "none"
                            : "0 4px 14px 0 rgba(255, 153, 172, 0.4)",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {isStarting ? t("starting") : t("startButton")}
                </Button>

                <p className="text-text-muted text-center text-[11px]">
                    {isDailyLimitReached
                        ? t("dailyQuotaUpgradeHint")
                        : isConcurrentLimitReached
                          ? "Hãy hoàn thành các phiên trước ở thanh menu bên trái."
                          : t("startHint")}
                </p>
            </div>
        </div>
    );
};

export default PersonaSummaryCard;
