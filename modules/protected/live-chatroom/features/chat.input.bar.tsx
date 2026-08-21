"use client";

import React from "react";
import { Mic, MicOff, Send, X } from "lucide-react";
import { IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import { AudioVisualizer } from "../components/audio.visualizer";

interface ChatInputBarProps {
    value: string;
    onChange: (text: string) => void;
    onSend: () => void;
    isRecording: boolean;
    micStream: MediaStream | null;
    onToggleRecord: () => void;
    onCancelRecord: () => void;
    disabled?: boolean;
}

export function ChatInputBar({
    value,
    onChange,
    onSend,
    isRecording,
    micStream,
    onToggleRecord,
    onCancelRecord,
    disabled = false,
}: Readonly<ChatInputBarProps>) {
    const t = useTranslations("liveChatroom");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div
            data-tour-id="tour-ai1on1-input-bar"
            className="border-bdc-primary bg-bgc-page/50 flex items-center gap-2 rounded-2xl border p-2 shadow-inner"
        >
            {isRecording ? (
                <div className="flex flex-1 items-center justify-between px-3 py-1">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                        </span>
                        <span className="text-xs font-semibold text-red-500">
                            {t("recording")}
                        </span>
                    </div>

                    <AudioVisualizer stream={micStream} />

                    <div className="flex items-center gap-1">
                        <IconButton
                            size="small"
                            onClick={onCancelRecord}
                            className="text-text-muted hover:text-text-contrast"
                            title={t("cancel")}
                        >
                            <X className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={onToggleRecord}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            title={t("stopRecording")}
                        >
                            <MicOff className="h-4 w-4" />
                        </IconButton>
                    </div>
                </div>
            ) : (
                <>
                    <IconButton
                        onClick={onToggleRecord}
                        disabled={disabled}
                        data-tour-id="tour-ai1on1-mic-btn"
                        className="border-bdc-primary/60 bg-bgc-app hover:bg-bgc-highlight/10 hover:text-bgc-highlight text-text-muted shrink-0 border transition-colors disabled:opacity-40"
                        aria-label="Microphone"
                    >
                        <Mic className="h-5 w-5" />
                    </IconButton>

                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={t("inputPlaceholder")}
                        className="text-text-contrast placeholder:text-text-muted/60 flex-1 bg-transparent px-2 text-sm focus:outline-none disabled:opacity-40"
                    />

                    <IconButton
                        onClick={onSend}
                        disabled={disabled || !value.trim()}
                        className="bg-bgc-highlight hover:bg-bgc-highlight/90 shrink-0 text-white shadow-xs transition-opacity disabled:opacity-30"
                        aria-label="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </IconButton>
                </>
            )}
        </div>
    );
}

export default ChatInputBar;
