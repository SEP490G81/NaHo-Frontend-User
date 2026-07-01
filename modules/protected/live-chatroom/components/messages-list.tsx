"use client";
import React from "react";
import { AiMessageBubble } from "./ai-message-bubble";
import { UserMessageBubble } from "./user-message-bubble";
import { TypingIndicator } from "./typing-indicator";
import type { ChatMessage, Companion } from "../types/live-chatroom.type";

interface MessagesListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  companion: Companion;
  showFurigana: boolean;
  autoTranslate: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function MessagesList({
  messages,
  isTyping,
  companion,
  showFurigana,
  autoTranslate,
  scrollRef,
}: MessagesListProps) {
  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        {messages.map((m) =>
          m.role === "ai" ? (
            <AiMessageBubble
              key={m.id}
              message={m}
              companion={companion}
              showFurigana={showFurigana}
              autoTranslate={autoTranslate}
            />
          ) : (
            <UserMessageBubble key={m.id} message={m} />
          )
        )}
        {isTyping && <TypingIndicator companion={companion} />}
      </div>
    </div>
  );
}

export default MessagesList;
