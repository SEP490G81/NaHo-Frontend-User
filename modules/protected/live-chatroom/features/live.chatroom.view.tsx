"use client";

import React, { useRef, useState, useEffect } from "react";
import { CircularProgress, Fab, Tooltip } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
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
        isLoading,
        isSendingMessage,
        isEndingSession,
        setSpeechSpeed,
        setShowSuggestions,
        sendTextMessage,
        sendAudioMessage,
        endChatSession,
    } = useLiveChatroom();

    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
    const [showScrollBottom, setShowScrollBottom] = useState<boolean>(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState<boolean>(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const latestAiMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "AI");
    const latestAiMessageId = latestAiMessage?.id;
    const suggestedReplies = latestAiMessage?.suggestedReplies || [];

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                messagesContainerRef.current;
            setShowScrollTop(scrollTop > 150);
            setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 150);
        }
    };

    const scrollToTop = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (!isLoading && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
        handleScroll();
    }, [messages, isLoading, isSendingMessage]);

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
                        isLoading={isLoading}
                        isEndingSession={isEndingSession}
                        onSpeedChange={setSpeechSpeed}
                        onToggleSuggestions={setShowSuggestions}
                        onEndSession={() => setIsEndDialogOpen(true)}
                    />
                </div>

                {/* Right Chat Area (3/4 width) */}
                <div className="border-bdc-primary bg-bgc-app flex h-full min-h-0 flex-col justify-between rounded-2xl border p-4 shadow-xs lg:col-span-3">
                    {isLoading ? (
                        <div className="my-auto flex flex-col items-center justify-center py-20">
                            <CircularProgress size={36} />
                            <p className="mt-3 text-xs text-text-muted">
                                Đang tải thông tin phiên hội thoại...
                            </p>
                        </div>
                    ) : (
                        <div className="relative flex flex-1 flex-col justify-between overflow-hidden min-h-0">
                            {/* Messages Stream */}
                            <div
                                ref={messagesContainerRef}
                                onScroll={handleScroll}
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
                                        <div className="border-bdc-primary/60 bg-bgc-secondary/50 flex items-center gap-3 rounded-2xl rounded-tl-xs border px-4 py-3 text-text-contrast shadow-2xs backdrop-blur-xs">
                                            <div className="flex items-center gap-1.5">
                                                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
                                                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
                                                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full" />
                                            </div>
                                            <span className="text-xs font-medium italic text-text-muted">
                                                {t("aiTyping")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Floating Scroll Controls */}
                            {(showScrollTop || showScrollBottom) && (
                                <div className="absolute right-4 bottom-20 z-10 flex flex-col gap-2">
                                    {showScrollTop && (
                                        <Tooltip title={t("backToTop")}>
                                            <Fab
                                                size="small"
                                                onClick={scrollToTop}
                                                sx={{
                                                    backgroundColor:
                                                        "var(--color-bgc-secondary)",
                                                    color: "var(--color-text-contrast)",
                                                    border: "1px solid var(--color-bdc-primary)",
                                                    boxShadow:
                                                        "0 4px 12px rgba(0,0,0,0.15)",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "var(--color-bgc-highlight)",
                                                        color: "#ffffff",
                                                    },
                                                }}
                                            >
                                                <KeyboardArrowUpRoundedIcon
                                                    sx={{ fontSize: 22 }}
                                                />
                                            </Fab>
                                        </Tooltip>
                                    )}
                                    {showScrollBottom && (
                                        <Tooltip title={t("scrollToBottom")}>
                                            <Fab
                                                size="small"
                                                onClick={scrollToBottom}
                                                sx={{
                                                    backgroundColor:
                                                        "var(--color-bgc-secondary)",
                                                    color: "var(--color-text-contrast)",
                                                    border: "1px solid var(--color-bdc-primary)",
                                                    boxShadow:
                                                        "0 4px 12px rgba(0,0,0,0.15)",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "var(--color-bgc-highlight)",
                                                        color: "#ffffff",
                                                    },
                                                }}
                                            >
                                                <KeyboardArrowDownRoundedIcon
                                                    sx={{ fontSize: 22 }}
                                                />
                                            </Fab>
                                        </Tooltip>
                                    )}
                                </div>
                            )}

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
                    )}
                </div>
            </div>

            {/* End Session Confirmation Dialog */}
            <EndSessionDialogComponent
                open={isEndDialogOpen}
                isEnding={isEndingSession}
                onConfirm={endChatSession}
                onClose={() => setIsEndDialogOpen(false)}
            />
        </div>
    );
};

export default LiveChatroomView;
