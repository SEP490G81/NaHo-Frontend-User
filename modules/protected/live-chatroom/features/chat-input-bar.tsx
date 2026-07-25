"use client";
import { Mic, Send, Square, X } from "lucide-react";
import { Button, IconButton } from "@mui/material";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
import { AudioVisualizer } from "../components/audio-visualizer";

interface Props {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    isRecording: boolean;
    micStream: MediaStream | null;
    onToggleRecord: () => void;
    onCancelRecord?: () => void;
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
    disabled,
}: Props) {
    const t = useTranslations("liveChatroom");

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) onSend();
        }
    };

    return (
        <div className="space-y-2">
            {isRecording && (
                <div className="bg-bgc-highlight/10 text-bgc-highlight flex items-center justify-center gap-3 rounded-lg px-3 py-2 text-xs font-medium">
                    <AudioVisualizer
                        stream={micStream}
                        isRecording={isRecording}
                    />
                    {t("listeningIndicator")}
                </div>
            )}
            <div className="flex items-end gap-2">
                <IconButton
                    onClick={onToggleRecord}
                    disabled={disabled}
                    aria-label={isRecording ? t("micStop") : t("micStart")}
                    className={cn(
                        "[&.Mui-disabled]:!bg-bdc-primary [&.Mui-disabled]:!text-text-muted !h-14 !w-14 shrink-0 rounded-full text-white shadow-md transition-all",
                        isRecording
                            ? "!bg-bgc-error hover:!bg-bgc-error/90 animate-pulse"
                            : "!bg-bgc-highlight hover:opacity-90",
                    )}
                >
                    {isRecording ? (
                        <Square className="h-5 w-5" />
                    ) : (
                        <Mic className="h-5 w-5" />
                    )}
                </IconButton>
                {isRecording && onCancelRecord && (
                    <IconButton
                        onClick={onCancelRecord}
                        disabled={disabled}
                        aria-label={t("cancelRecord")}
                        className="bg-bgc-app border-bdc-primary text-text-muted hover:bg-hbgc-app !h-14 !w-14 shrink-0 rounded-full border shadow-md"
                    >
                        <X className="h-5 w-5" />
                    </IconButton>
                )}
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t("inputPlaceholder")}
                    className="border-bdc-primary bg-bgc-app text-text-contrast placeholder-text-muted focus:border-bgc-highlight focus:ring-bgc-highlight min-h-[56px] flex-1 resize-none rounded-lg border p-3 text-sm focus:ring-1 focus:outline-none disabled:opacity-50"
                    disabled={disabled || isRecording}
                    rows={1}
                />
                <Button
                    onClick={onSend}
                    disabled={disabled || isRecording || !value.trim()}
                    variant="contained"
                    color="primary"
                    className="[&.Mui-disabled]:!bg-bdc-primary [&.Mui-disabled]:!text-text-muted !h-14 !rounded-lg !px-5 font-bold capitalize hover:opacity-90"
                    startIcon={<Send className="h-4 w-4" />}
                >
                    {t("sendButton")}
                </Button>
            </div>
        </div>
    );
}

export default ChatInputBar;
