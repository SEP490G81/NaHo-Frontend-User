"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLiveChatroom } from "../hooks/use.live.chatroom";
import SessionSidebarComponent from "../components/session.sidebar.component";
import MessageItemComponent from "../components/message.item.component";
import ChatInputComponent from "../components/chat.input.component";
import EndSessionDialogComponent from "../components/end.session.dialog.component";

const LiveChatroomView = () => {
    const t = useTranslations("liveChatroom");
    const {
        personaInfo,
        marugotoLevel,
        formalityLevel,
        speechSpeed,
        showSuggestions,
        messages,
        isSendingMessage,
        isEndingSession,
        setSpeechSpeed,
        setShowSuggestions,
        sendTextMessage,
        sendAudioMessage,
        endChatSession,
    } = useLiveChatroom();

    const [isEndDialogOpen, setIsEndDialogOpen] = useState<boolean>(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const latestAiMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "AI");
    const latestAiMessageId = latestAiMessage?.id;

    // Chỉ hiển thị gợi ý phản hồi nếu tin nhắn MỚI NHẤT trong phòng chat là từ AI và người dùng chưa bấm gửi
    const lastMessage = messages[messages.length - 1];
    const isLastMessageFromAi =
        lastMessage?.sender === "AI" && !isSendingMessage;
    const suggestedReplies = isLastMessageFromAi
        ? lastMessage?.suggestedReplies || []
        : [];

    return (
        <div className="mx-auto h-[calc(100vh-140px)] w-full">
            {/* Main Content Layout */}
            <div className="grid h-full grid-cols-1 items-stretch gap-6 lg:grid-cols-4">
                {/* Left Sidebar Info (1/4 width) */}
                <div className="h-full overflow-hidden lg:col-span-1">
                    <SessionSidebarComponent
                        persona={personaInfo}
                        marugotoLevel={marugotoLevel}
                        formalityLevel={formalityLevel}
                        speechSpeed={speechSpeed}
                        showSuggestions={showSuggestions}
                        isEndingSession={isEndingSession}
                        canEndSession={messages.length > 1}
                        onSpeedChange={setSpeechSpeed}
                        onToggleSuggestions={setShowSuggestions}
                        onEndSession={() => setIsEndDialogOpen(true)}
                    />
                </div>

                {/* Right Chat Area (3/4 width) */}
                <div className="border-bdc-primary bg-bgc-app flex h-full min-h-0 flex-col justify-between rounded-2xl border p-4 shadow-xs lg:col-span-3">
                    <div className="relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden">
                        {/* Messages Stream */}
                        <div
                            ref={messagesContainerRef}
                            className="custom-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto pr-2"
                        >
                            {messages.map((msg) => (
                                <MessageItemComponent
                                    key={msg.id}
                                    message={msg}
                                    speechSpeed={speechSpeed}
                                    isLatestAiMessage={
                                        msg.id === latestAiMessageId
                                    }
                                />
                            ))}

                            {/* AI Typing Response Loading Indicator */}
                            {isSendingMessage && (
                                <div className="my-3 flex max-w-[85%] flex-col items-start space-y-2">
                                    <div className="border-bdc-primary/60 bg-bgc-secondary/50 text-text-contrast flex items-center gap-3 rounded-2xl rounded-tl-xs border px-4 py-3 shadow-2xs backdrop-blur-xs">
                                        <div className="flex items-center gap-1.5">
                                            <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
                                            <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
                                            <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full" />
                                        </div>
                                        <span className="text-text-muted text-xs font-medium italic">
                                            {t("aiTyping")}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Interactive Chat Input Bar */}
                        <div className="shrink-0 pt-2">
                            <ChatInputComponent
                                suggestedReplies={suggestedReplies}
                                showSuggestions={showSuggestions}
                                onSendText={sendTextMessage}
                                onSendAudio={sendAudioMessage}
                                isSending={isSendingMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* End Session Confirmation Dialog */}
            <EndSessionDialogComponent
                open={isEndDialogOpen}
                isEnding={isEndingSession}
                canEndSession={messages.length > 1}
                onConfirm={endChatSession}
                onClose={() => setIsEndDialogOpen(false)}
            />
        </div>
    );
};

export default LiveChatroomView;
