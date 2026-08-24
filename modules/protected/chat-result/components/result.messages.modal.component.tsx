"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import { SpeakingSessionMessageResponse } from "@/types/responses/speaking.llm.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import MessageItemComponent from "@/modules/protected/live-chatroom/components/message.item.component";
import { ChatMessageItem } from "@/modules/protected/live-chatroom/types/live.chatroom.type";
import { getAvatarGradient, getInitialLetter } from "../utils/chat.result.util";
import { cn } from "@/libs/utils";

interface ResultMessagesModalProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly messages?: SpeakingSessionMessageResponse[] | null;
    readonly persona?: PersonaResponse | null;
}

const ResultMessagesModalComponent = ({
    open,
    onClose,
    messages,
    persona,
}: ResultMessagesModalProps) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const messageList = Array.isArray(messages) ? messages : [];

    const personaName = persona?.name || "Bạn đồng hành AI";
    const avatarUrl = persona?.avatarFile?.accessUrl;
    const initialLetter = getInitialLetter(personaName);
    const gradient = getAvatarGradient(personaName);

    // Map SpeakingSessionMessageResponse cleanly to ChatMessageItem
    const mappedMessages: ChatMessageItem[] = messageList.map((msg, idx) => {
        const isUser = msg.senderType?.toUpperCase() === "USER";
        const userAudio = isUser
            ? msg.userRecordAudio || msg.aiReplyAudio
            : undefined;
        const aiAudio = !isUser
            ? msg.aiReplyAudio || msg.userRecordAudio
            : undefined;

        const isHttpUrl = (str?: string | null) =>
            str?.startsWith("http://") || str?.startsWith("https://");

        return {
            id: msg.id || msg.turnIndex || idx,
            sender: isUser ? "USER" : "AI",
            content: msg.content,
            contentTranslation: msg.contentTranslation,
            correctedText: msg.correctedText,
            correctionExplanation: msg.correctionExplanation,
            grammarNote: msg.grammarNote,
            hintForLearner: msg.hintForLearner,
            pronunciationScore: msg.pronunciationScore,
            aiReplyAudio: aiAudio,
            userRecordAudio: userAudio,
            audioUrl: isHttpUrl(userAudio)
                ? (userAudio as string)
                : isHttpUrl(aiAudio)
                  ? (aiAudio as string)
                  : undefined,
            suggestedReplies: msg.suggestedReplies || [],
        };
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "24px",
                        backgroundColor: "var(--color-bgc-app)",
                        border: "1px solid var(--color-bdc-primary)",
                        boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        overflow: "hidden",
                    },
                },
            }}
        >
            {/* Modal Header */}
            <DialogTitle className="border-bdc-primary/60 bg-bgc-app flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-3.5">
                    {/* Persona Avatar */}
                    {avatarUrl && !imageError ? (
                        <div className="border-bdc-primary bg-bgc-secondary/50 relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border shadow-xs">
                            <Image
                                src={avatarUrl}
                                alt={personaName}
                                fill
                                sizes="44px"
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-base font-bold text-white shadow-xs",
                                gradient,
                            )}
                        >
                            <span>{initialLetter}</span>
                        </div>
                    )}

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-text-contrast text-base font-extrabold tracking-tight">
                                Lịch sử cuộc hội thoại
                            </h3>
                            {persona?.voiceName && (
                                <span className="border-bdc-primary bg-bgc-secondary text-text-muted inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                                    <GraphicEqRoundedIcon
                                        sx={{ fontSize: 13 }}
                                    />
                                    {persona.voiceName}
                                </span>
                            )}
                        </div>
                        <p className="text-text-muted mt-0.5 flex items-center gap-1.5 text-xs font-medium">
                            <span>với {personaName}</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <ForumOutlinedIcon sx={{ fontSize: 13 }} />
                                {mappedMessages.length} lượt trao đổi
                            </span>
                        </p>
                    </div>
                </div>

                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: "var(--color-text-muted)",
                        borderRadius: "10px",
                        padding: "6px",
                        "&:hover": {
                            backgroundColor: "var(--color-hbgc-app)",
                            color: "var(--color-text-contrast)",
                        },
                    }}
                >
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
            </DialogTitle>

            {/* Modal Content - Direct Chat Stream (Clean, No Nested Double Boxes) */}
            <DialogContent className="custom-scrollbar bg-bgc-app max-h-[70vh] min-h-[300px] space-y-4 overflow-y-auto px-6 py-4">
                {mappedMessages.length > 0 ? (
                    mappedMessages.map((msg) => (
                        <MessageItemComponent
                            key={msg.id}
                            message={msg}
                            speechSpeed={1.0}
                            isLatestAiMessage={false}
                        />
                    ))
                ) : (
                    <div className="border-bdc-primary bg-bgc-secondary/30 my-8 rounded-2xl border p-8 text-center shadow-2xs">
                        <p className="text-text-muted text-sm italic">
                            Phiên trò chuyện này không có dữ liệu tin nhắn hội
                            thoại.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ResultMessagesModalComponent;
