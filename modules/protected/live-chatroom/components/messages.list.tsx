"use client";

import React, { RefObject } from "react";
import { AiMessageBubble } from "./ai.message.bubble";
import { UserMessageBubble } from "./user.message.bubble";
import { TypingIndicator } from "./typing.indicator";
import { UserAudioProcessing } from "./user.audio.processing";
import type { ChatMessage, Companion } from "../types/live.chatroom.type";

interface MessagesListProps {
    messages: ChatMessage[];
    isTyping: boolean;
    audioProcessing: boolean;
    companion: Companion;
    scrollRef: RefObject<HTMLDivElement | null>;
}

export function MessagesList({
    messages,
    isTyping,
    audioProcessing,
    companion,
    scrollRef,
}: Readonly<MessagesListProps>) {
    return (
        <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6"
        >
            {messages.map((msg) =>
                msg.role === "ai" ? (
                    <AiMessageBubble
                        key={msg.id}
                        message={msg}
                        companion={companion}
                    />
                ) : (
                    <UserMessageBubble key={msg.id} message={msg} />
                ),
            )}

            {audioProcessing && <UserAudioProcessing />}

            {isTyping && <TypingIndicator companion={companion} />}
        </div>
    );
}

export default MessagesList;
