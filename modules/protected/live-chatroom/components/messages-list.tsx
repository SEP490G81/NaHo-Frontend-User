"use client";
import React from "react";
import { AiMessageBubble } from "./ai-message-bubble";
import { UserMessageBubble } from "./user-message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { UserAudioProcessing } from "./user-audio-processing";
import type { ChatMessage, Companion } from "../types/live-chatroom.type";

interface MessagesListProps {
    messages: ChatMessage[];
    isTyping: boolean;
    audioProcessing: boolean;
    companion: Companion;
    voiceSpeed: number;
    scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function MessagesList({
    messages,
    isTyping,
    audioProcessing,
    companion,
    voiceSpeed,
    scrollRef,
}: MessagesListProps) {
    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
                {messages.map((m) =>
                    m.role === "ai" ? (
                        <AiMessageBubble
                            key={m.id}
                            message={m}
                            companion={companion}
                            voiceSpeed={voiceSpeed}
                        />
                    ) : (
                        <UserMessageBubble key={m.id} message={m} />
                    ),
                )}
                {audioProcessing && <UserAudioProcessing />}
                {isTyping && <TypingIndicator companion={companion} />}
            </div>
        </div>
    );
}

export default MessagesList;
