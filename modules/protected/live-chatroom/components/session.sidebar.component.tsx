"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Divider, Skeleton, Slider, Switch } from "@mui/material";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PersonaAvatarBadge from "@/modules/protected/persona-setup/components/persona.avatar.badge";
import {
    getFormalityLevelLabel,
    getMarugotoLevelLabel,
} from "@/modules/protected/persona-setup/utils/persona.setup.util";
import { useChatStore } from "@/store/chatStore";
import { SessionSidebarProps } from "../types/live.chatroom.type";
import {
    MAX_SPEECH_SPEED,
    MIN_SPEECH_SPEED,
    SPEECH_SPEED_STEP,
} from "../constants/live.chatroom.constant";

const SessionSidebarComponent = ({
    persona,
    marugotoLevel,
    formalityLevel,
    speechSpeed,
    showSuggestions = true,
    isLoading = false,
    isEndingSession = false,
    onSpeedChange,
    onToggleSuggestions,
    onEndSession,
}: SessionSidebarProps) => {
    const t = useTranslations("liveChatroom");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const setAutoPlayAudio = useChatStore((s) => s.setAutoPlayAudio);

    return (
        <div className="flex h-full flex-col justify-between rounded-2xl border border-bdc-primary bg-bgc-app p-5 shadow-xs">
            <div>
                <h3 className="border-b border-bdc-primary pb-3 text-base font-bold text-text-contrast">
                    {t("settingsTitle")}
                </h3>

                {/* Persona Info */}
                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center gap-3">
                            <Skeleton variant="circular" width={48} height={48} />
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <Skeleton variant="text" width="70%" height={18} />
                                <Skeleton variant="text" width="40%" height={14} />
                            </div>
                        </div>
                    ) : persona ? (
                        <div className="flex items-center gap-3">
                            <PersonaAvatarBadge
                                name={persona.name}
                                avatarUrl={persona.avatarFile?.accessUrl}
                                size={48}
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="truncate text-sm font-bold text-text-contrast">
                                    {persona.name}
                                </h4>
                                {persona.voiceName && (
                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                                        <GraphicEqRoundedIcon sx={{ fontSize: 13 }} />
                                        <span className="truncate">{persona.voiceName}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs italic text-text-muted">
                            {t("readyLoading")}
                        </p>
                    )}
                </div>

                <Divider sx={{ borderColor: "var(--color-bdc-primary)" }} />

                {/* Session Settings */}
                <div className="space-y-3 py-4 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-muted">
                            <SchoolOutlinedIcon sx={{ fontSize: 15 }} />
                            Trình độ:
                        </span>
                        {isLoading ? (
                            <Skeleton variant="text" width={60} height={16} />
                        ) : (
                            <span className="font-bold text-text-contrast">
                                {getMarugotoLevelLabel(marugotoLevel)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-muted">
                            <RecordVoiceOverOutlinedIcon sx={{ fontSize: 15 }} />
                            Phong cách:
                        </span>
                        {isLoading ? (
                            <Skeleton variant="text" width={60} height={16} />
                        ) : (
                            <span className="font-bold text-text-contrast">
                                {getFormalityLevelLabel(formalityLevel)}
                            </span>
                        )}
                    </div>

                    {/* Speech Speed Control */}
                    <div className="pt-2">
                        <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-text-muted">
                                <SpeedRoundedIcon sx={{ fontSize: 15 }} />
                                {t("speedLabel")}:
                            </span>
                            <span className="font-extrabold text-text-highlight">
                                {speechSpeed.toFixed(2)}x
                            </span>
                        </div>
                        <Slider
                            size="small"
                            value={speechSpeed}
                            min={MIN_SPEECH_SPEED}
                            max={MAX_SPEECH_SPEED}
                            step={SPEECH_SPEED_STEP}
                            disabled={isLoading}
                            onChange={(_, val) =>
                                onSpeedChange(Array.isArray(val) ? val[0] : val)
                            }
                            sx={{
                                color: "var(--color-bgc-highlight)",
                                py: 1,
                                "& .MuiSlider-thumb": {
                                    width: 14,
                                    height: 14,
                                },
                            }}
                        />
                    </div>

                    <Divider sx={{ borderColor: "var(--color-bdc-primary)", my: 1 }} />

                    {/* AI Audio Playback Setting */}
                    <div className="pt-1">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium text-text-muted">
                                <VolumeUpOutlinedIcon sx={{ fontSize: 15 }} />
                                {t("aiAudioTitle")}:
                            </span>
                            <Switch
                                size="small"
                                checked={autoPlayAudio}
                                disabled={isLoading}
                                onChange={(e) => setAutoPlayAudio(e.target.checked)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "var(--color-bgc-highlight)",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "var(--color-bgc-highlight)",
                                    },
                                }}
                            />
                        </div>
                        <p className="mt-1 text-[11px] italic text-text-muted">
                            {autoPlayAudio
                                ? t("aiAudioAutoPlayDesc")
                                : t("aiAudioManualDesc")}
                        </p>
                    </div>

                    <Divider sx={{ borderColor: "var(--color-bdc-primary)", my: 1 }} />

                    {/* Toggle Suggestions Setting */}
                    <div className="pt-1">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium text-text-muted">
                                <LightbulbOutlinedIcon sx={{ fontSize: 15 }} />
                                {t("toggleSuggestions")}:
                            </span>
                            <Switch
                                size="small"
                                checked={showSuggestions}
                                disabled={isLoading}
                                onChange={(e) => onToggleSuggestions?.(e.target.checked)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "var(--color-bgc-highlight)",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "var(--color-bgc-highlight)",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* End Session Action Button */}
            <div className="pt-3 border-t border-bdc-primary">
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    disabled={isLoading || isEndingSession}
                    onClick={onEndSession}
                    startIcon={<FlagOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        py: 1,
                        borderColor: "rgba(239, 35, 60, 0.4)",
                        "&:hover": {
                            backgroundColor: "rgba(239, 35, 60, 0.08)",
                            borderColor: "var(--color-text-error)",
                        },
                    }}
                >
                    {t("endSessionBtn") || "Kết thúc trò chuyện"}
                </Button>
            </div>
        </div>
    );
};

export default SessionSidebarComponent;
