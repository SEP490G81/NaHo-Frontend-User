"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    CircularProgress,
    IconButton,
    InputBase,
    Tooltip,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useMySubscription } from "@/hooks/use.my.subscription";
import SuggestedRepliesComponent from "./suggested.replies.component";
import AudioPlayerComponent from "./audio.player.component";
import { useAudioRecorder } from "../hooks/use.audio.recorder";
import { ChatInputProps } from "../types/live.chatroom.type";

const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const ChatInputComponent = ({
    suggestedReplies = [],
    showSuggestions = true,
    onSendText,
    onSendAudio,
    disabled = false,
    isSending = false,
}: ChatInputProps) => {
    const t = useTranslations("liveChatroom");
    const [inputText, setInputText] = useState<string>("");

    const { data: userSub } = useMySubscription();
    const maxSpeakingSeconds =
        (userSub as any)?.subscriptionPlan?.maxAiTurnSpeakingSeconds ??
        (userSub as any)?.plan?.maxAiTurnSpeakingSeconds ??
        (userSub as any)?.maxAiTurnSpeakingSeconds ??
        30;

    const {
        isRecording,
        audioBlob,
        audioUrl,
        timeLeft,
        startRecording,
        stopRecording,
        clearRecording,
    } = useAudioRecorder(maxSpeakingSeconds);

    const handleSelectSuggestion = (text: string) => {
        setInputText(text);
    };

    const handleSend = () => {
        if (isSending || disabled) return;
        if (audioBlob) {
            onSendAudio?.(audioBlob);
            clearRecording();
            return;
        }
        if (inputText.trim()) {
            onSendText?.(inputText.trim());
            setInputText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isInputDisabled = disabled || isSending;

    return (
        <div className="w-full pt-3">
            {/* Suggested Replies List */}
            {showSuggestions && (
                <SuggestedRepliesComponent
                    suggestions={suggestedReplies}
                    onSelectSuggestion={handleSelectSuggestion}
                />
            )}

            {/* Input Bar Container */}
            <div className="border-bdc-primary bg-bgc-secondary/50 focus-within:border-bgc-highlight flex items-center gap-2 rounded-2xl border px-3 py-2 transition-colors">
                {isRecording ? (
                    /* Active Recording Indicator */
                    <div className="flex flex-1 items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 animate-ping rounded-full bg-red-500" />
                            <span className="text-text-contrast text-xs font-semibold">
                                {t("recording")}
                            </span>
                            <span
                                className={`rounded-full px-2 py-0.5 font-mono text-xs font-bold transition-colors ${
                                    timeLeft <= 5
                                        ? "animate-pulse bg-red-500/20 text-red-500"
                                        : "bg-bgc-highlight/15 text-bgc-highlight"
                                }`}
                            >
                                {formatTime(timeLeft)} / {formatTime(maxSpeakingSeconds)}
                            </span>
                        </div>
                        <Tooltip title={t("stopRecording")}>
                            <IconButton
                                size="small"
                                onClick={stopRecording}
                                sx={{ color: "var(--color-text-error)" }}
                            >
                                <StopRoundedIcon sx={{ fontSize: 22 }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : audioUrl ? (
                    /* Recorded Audio Preview Player */
                    <div className="flex flex-1 items-center justify-between gap-2 px-1">
                        <div className="flex-1">
                            <AudioPlayerComponent
                                audioUrl={audioUrl}
                                autoPlay={false}
                            />
                        </div>
                        <Tooltip title={t("reRecord")}>
                            <IconButton
                                size="small"
                                onClick={clearRecording}
                                disabled={isInputDisabled}
                            >
                                <DeleteOutlineRoundedIcon
                                    sx={{ fontSize: 18 }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    /* Standard Text Input */
                    <>
                        <InputBase
                            fullWidth
                            placeholder={
                                isSending
                                    ? "Đang gửi câu trả lời..."
                                    : t("inputPlaceholder")
                            }
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isInputDisabled}
                            sx={{
                                fontSize: "13px",
                                color: "var(--color-text-contrast)",
                                px: 1,
                            }}
                        />

                        <Tooltip title={t("micStart")}>
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={startRecording}
                                    disabled={isInputDisabled}
                                    sx={{ color: "var(--color-text-muted)" }}
                                >
                                    <MicRoundedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </>
                )}

                {/* Send Button */}
                <Tooltip title={t("sendButton")}>
                    <span>
                        <IconButton
                            size="small"
                            onClick={handleSend}
                            disabled={
                                isInputDisabled ||
                                (!inputText.trim() && !audioUrl)
                            }
                            sx={{
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                "&:hover": {
                                    backgroundColor:
                                        "var(--color-bgc-highlight)",
                                    opacity: 0.9,
                                },
                                "&.Mui-disabled": {
                                    backgroundColor: "var(--color-bdc-primary)",
                                    color: "var(--color-text-muted)",
                                },
                            }}
                        >
                            {isSending ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <SendRoundedIcon sx={{ fontSize: 16 }} />
                            )}
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};

export default ChatInputComponent;
