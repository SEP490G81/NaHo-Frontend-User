"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Divider, Slider, Switch, Tooltip } from "@mui/material";
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
    isEndingSession = false,
    canEndSession = true,
    onSpeedChange,
    onToggleSuggestions,
    onEndSession,
}: SessionSidebarProps) => {
    const t = useTranslations("liveChatroom");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const setAutoPlayAudio = useChatStore((s) => s.setAutoPlayAudio);

    return (
        <div className="border-bdc-primary bg-bgc-app flex h-full flex-col justify-between rounded-2xl border p-5 shadow-xs">
            <div>
                <h3 className="border-bdc-primary text-text-contrast border-b pb-3 text-base font-bold">
                    {t("settingsTitle")}
                </h3>

                {/* Persona Info */}
                <div className="py-4">
                    {persona ? (
                        <div className="flex items-center gap-3">
                            <PersonaAvatarBadge
                                name={persona.name}
                                avatarUrl={persona.avatarFile?.accessUrl}
                                size={48}
                            />
                            <div className="min-w-0 flex-1">
                                <h4 className="text-text-contrast truncate text-sm font-bold">
                                    {persona.name}
                                </h4>
                                {persona.voiceName && (
                                    <p className="text-text-muted mt-0.5 flex items-center gap-1 text-xs">
                                        <GraphicEqRoundedIcon
                                            sx={{ fontSize: 13 }}
                                        />
                                        <span className="truncate">
                                            {persona.voiceName}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-text-muted text-xs italic">
                            {t("readyLoading")}
                        </p>
                    )}
                </div>

                <Divider sx={{ borderColor: "var(--color-bdc-primary)" }} />

                {/* Session Settings */}
                <div className="space-y-3 py-4 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted flex items-center gap-1.5">
                            <SchoolOutlinedIcon sx={{ fontSize: 15 }} />
                            Trình độ:
                        </span>
                        <span className="text-text-contrast font-bold">
                            {getMarugotoLevelLabel(marugotoLevel)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-text-muted flex items-center gap-1.5">
                            <RecordVoiceOverOutlinedIcon
                                sx={{ fontSize: 15 }}
                            />
                            Phong cách:
                        </span>
                        <span className="text-text-contrast font-bold">
                            {getFormalityLevelLabel(formalityLevel)}
                        </span>
                    </div>

                    {/* Speech Speed Control */}
                    <div className="pt-2">
                        <div className="mb-1 flex items-center justify-between">
                            <span className="text-text-muted flex items-center gap-1.5">
                                <SpeedRoundedIcon sx={{ fontSize: 15 }} />
                                {t("speedLabel")}:
                            </span>
                            <span className="text-text-highlight font-extrabold">
                                {speechSpeed.toFixed(2)}x
                            </span>
                        </div>
                        <Slider
                            size="small"
                            value={speechSpeed}
                            min={MIN_SPEECH_SPEED}
                            max={MAX_SPEECH_SPEED}
                            step={SPEECH_SPEED_STEP}
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

                    <Divider
                        sx={{ borderColor: "var(--color-bdc-primary)", my: 1 }}
                    />

                    {/* AI Audio Playback Setting */}
                    <div className="pt-1">
                        <div className="flex items-center justify-between">
                            <span className="text-text-muted flex items-center gap-1.5 font-medium">
                                <VolumeUpOutlinedIcon sx={{ fontSize: 15 }} />
                                {t("aiAudioTitle")}:
                            </span>
                            <Switch
                                size="small"
                                checked={autoPlayAudio}
                                onChange={(e) =>
                                    setAutoPlayAudio(e.target.checked)
                                }
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "var(--color-bgc-highlight)",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                        {
                                            backgroundColor:
                                                "var(--color-bgc-highlight)",
                                        },
                                }}
                            />
                        </div>
                        <p className="text-text-muted mt-1 text-[11px] italic">
                            {autoPlayAudio
                                ? t("aiAudioAutoPlayDesc")
                                : t("aiAudioManualDesc")}
                        </p>
                    </div>

                    <Divider
                        sx={{ borderColor: "var(--color-bdc-primary)", my: 1 }}
                    />

                    {/* Toggle Suggestions Setting */}
                    <div className="pt-1">
                        <div className="flex items-center justify-between">
                            <span className="text-text-muted flex items-center gap-1.5 font-medium">
                                <LightbulbOutlinedIcon sx={{ fontSize: 15 }} />
                                {t("toggleSuggestions")}:
                            </span>
                            <Switch
                                size="small"
                                checked={showSuggestions}
                                onChange={(e) =>
                                    onToggleSuggestions?.(e.target.checked)
                                }
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "var(--color-bgc-highlight)",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                        {
                                            backgroundColor:
                                                "var(--color-bgc-highlight)",
                                        },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* End Session Action Button */}
            <div className="border-bdc-primary border-t pt-3">
                <Tooltip
                    title={
                        !canEndSession
                            ? t("endSessionMinMessagesWarning") ||
                              "Phiên trò chuyện chưa có tương tác từ bạn. Vui lòng gửi ít nhất 1 tin nhắn cho AI trước khi kết thúc."
                            : ""
                    }
                    arrow
                    disableHoverListener={canEndSession}
                >
                    <span className="block w-full">
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            disabled={isEndingSession || !canEndSession}
                            onClick={onEndSession}
                            startIcon={
                                <FlagOutlinedIcon sx={{ fontSize: 16 }} />
                            }
                            sx={{
                                borderRadius: "10px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                py: 1,
                                borderColor: "rgba(239, 35, 60, 0.4)",
                                "&.Mui-disabled": {
                                    borderColor: "var(--color-bdc-primary)",
                                    color: "var(--color-text-muted)",
                                    opacity: 0.6,
                                },
                                "&:hover": {
                                    backgroundColor: "rgba(239, 35, 60, 0.08)",
                                    borderColor: "var(--color-text-error)",
                                },
                            }}
                        >
                            {t("endSessionBtn") || "Kết thúc trò chuyện"}
                        </Button>
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};

export default SessionSidebarComponent;
