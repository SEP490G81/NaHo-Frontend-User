"use client";
import { Avatar } from "@mui/material";
import { getInitials } from "../utils/get-initials";
import { Base64AudioPlayer } from "./base64-audio-player";
import type { AiChatMessage, Companion } from "../types/live-chatroom.type";

interface Props {
    message: AiChatMessage;
    companion: Companion;
    voiceSpeed: number;
}

export function AiMessageBubble({ message, companion, voiceSpeed }: Props) {
    return (
        <div className="flex gap-3">
            <Avatar className={`h-10 w-10 shrink-0 ${companion.accent}`}>
                {getInitials(companion.name)}
            </Avatar>
            <div className="max-w-[80%] space-y-2">
                <div className="text-text-muted flex items-center gap-2 text-xs">
                    <span className="text-text-contrast font-medium">
                        {companion.name}
                    </span>
                    <span>{message.timestamp}</span>
                </div>
                <div className="border-bdc-primary bg-bgc-app rounded-2xl rounded-tl-sm border px-5 py-3.5 shadow-sm">
                    <div className="font-noto-jp text-base leading-relaxed">
                        {message.text}
                    </div>
                    {message.audioBase64 && (
                        <div className="mt-3">
                            <Base64AudioPlayer
                                base64={message.audioBase64}
                                playbackRate={voiceSpeed}
                                autoPlay={message.autoPlay}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AiMessageBubble;
