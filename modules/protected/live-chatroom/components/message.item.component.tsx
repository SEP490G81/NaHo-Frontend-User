"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, CircularProgress, Collapse } from "@mui/material";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { useChatStore } from "@/store/chatStore";
import { MessageItemProps } from "../types/live.chatroom.type";
import AudioPlayerComponent from "./audio.player.component";

const MessageItemComponent = ({
    message,
    speechSpeed = 1.0,
    isLatestAiMessage = false,
}: MessageItemProps) => {
    const t = useTranslations("liveChatroom");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [showGrammar, setShowGrammar] = useState<boolean>(false);
    const [showCorrection, setShowCorrection] = useState<boolean>(false);
    const [showHint, setShowHint] = useState<boolean>(false);

    const isAi = message.sender === "AI";

    if (!isAi) {
        const hasUserAudio = !!(message.userRecordAudio || message.audioUrl);
        const userAudioUrl = message.userRecordAudio?.startsWith("http")
            ? message.userRecordAudio
            : message.audioUrl;
        const userAudioBase64 = message.userRecordAudio?.startsWith("http")
            ? undefined
            : message.userRecordAudio;

        /* User Message Bubble */
        return (
            <div className="my-3 flex flex-col items-end space-y-1.5">
                {/* User Text Bubble */}
                {message.content && (
                    <div
                        className={`max-w-[80%] rounded-2xl rounded-tr-xs px-4 py-3 text-white shadow-xs transition-all ${
                            message.isPending
                                ? "bg-bgc-highlight/85 animate-pulse border border-white/20"
                                : "bg-bgc-highlight"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {message.content}
                            </p>
                            {message.isPending && (
                                <CircularProgress
                                    size={12}
                                    sx={{ color: "#ffffff", ml: 0.5 }}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Audio Player for User Recorded Voice (Same style as AI Audio Player) */}
                {hasUserAudio && (
                    <div className="w-full max-w-md">
                        <AudioPlayerComponent
                            audioBase64={userAudioBase64}
                            audioUrl={userAudioUrl}
                            speechSpeed={speechSpeed}
                            autoPlay={false}
                        />
                    </div>
                )}

                {/* Pronunciation Score Badge */}
                {message.pronunciationScore != null &&
                    (() => {
                        const rawScore = message.pronunciationScore;
                        const isScale10 = rawScore <= 10;
                        const normalizedScore = isScale10
                            ? rawScore * 10
                            : rawScore;
                        const displayScore = isScale10
                            ? Number.isInteger(rawScore)
                                ? rawScore
                                : rawScore.toFixed(1)
                            : Math.round(rawScore);

                        let colorScheme = {
                            bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                            iconColor: "text-emerald-500",
                        };
                        if (normalizedScore < 50) {
                            colorScheme = {
                                bg: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
                                iconColor: "text-rose-500",
                            };
                        } else if (normalizedScore < 80) {
                            colorScheme = {
                                bg: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
                                iconColor: "text-amber-500",
                            };
                        }

                        return (
                            <div className="flex items-center justify-end pt-1 pr-0.5">
                                <div
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium shadow-2xs transition-all ${colorScheme.bg}`}
                                >
                                    <RecordVoiceOverOutlinedIcon
                                        sx={{ fontSize: 13 }}
                                        className={colorScheme.iconColor}
                                    />
                                    <span>{t("pronunciationScore")}:</span>
                                    <span className="font-extrabold tracking-wide">
                                        {displayScore}đ
                                    </span>
                                </div>
                            </div>
                        );
                    })()}

                {/* Feedback Buttons for User Message */}
                {(message.correctedText || message.hintForLearner) && (
                    <div className="flex flex-wrap items-center justify-end gap-1.5 pt-1">
                        {message.correctedText && (
                            <Button
                                size="small"
                                variant={
                                    showCorrection ? "contained" : "outlined"
                                }
                                onClick={() =>
                                    setShowCorrection((prev) => !prev)
                                }
                                startIcon={
                                    <AutoFixHighRoundedIcon
                                        sx={{ fontSize: 14 }}
                                    />
                                }
                                sx={{
                                    textTransform: "none",
                                    fontSize: "11px",
                                    py: 0.3,
                                    px: 1,
                                    borderRadius: "8px",
                                }}
                            >
                                {t("correctionSuggestion")}
                            </Button>
                        )}
                        {message.hintForLearner && (
                            <Button
                                size="small"
                                variant={showHint ? "contained" : "outlined"}
                                onClick={() => setShowHint((prev) => !prev)}
                                startIcon={
                                    <LightbulbOutlinedIcon
                                        sx={{ fontSize: 14 }}
                                    />
                                }
                                sx={{
                                    textTransform: "none",
                                    fontSize: "11px",
                                    py: 0.3,
                                    px: 1,
                                    borderRadius: "8px",
                                }}
                            >
                                {t("hintHeader")}
                            </Button>
                        )}
                    </div>
                )}

                {/* Correction Collapse */}
                <Collapse
                    in={showCorrection}
                    className="ml-auto w-fit max-w-[80%]"
                >
                    <div className="border-bdc-primary bg-bgc-secondary/90 text-text-contrast mt-1.5 ml-auto w-fit rounded-xl border p-2.5 text-left text-xs shadow-xs">
                        <span className="mb-0.5 block font-semibold text-emerald-600 dark:text-emerald-400">
                            {t("corrected")}:
                        </span>
                        <p className="font-medium">{message.correctedText}</p>
                        {message.correctionExplanation && (
                            <p className="text-text-muted mt-1 italic">
                                {message.correctionExplanation}
                            </p>
                        )}
                    </div>
                </Collapse>

                {/* Hint Collapse */}
                <Collapse in={showHint} className="ml-auto w-fit max-w-[80%]">
                    <div className="border-bdc-primary bg-bgc-secondary/90 text-text-contrast mt-1.5 ml-auto w-fit rounded-xl border p-2.5 text-left text-xs shadow-xs">
                        <span className="mb-0.5 block font-semibold text-sky-600 dark:text-sky-400">
                            {t("hintHeader")}:
                        </span>
                        <p>{message.hintForLearner}</p>
                    </div>
                </Collapse>
            </div>
        );
    }

    /* AI Message Bubble */
    return (
        <div className="my-3 flex max-w-[85%] flex-col items-start space-y-2">
            <div className="text-text-contrast w-full p-4">
                {/* Script Content */}
                <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                    {message.content}
                </p>

                {/* Audio Player if audio present */}
                {(message.aiReplyAudio ||
                    message.audioBase64 ||
                    message.audioUrl) && (
                    <AudioPlayerComponent
                        audioBase64={
                            message.aiReplyAudio || message.audioBase64
                        }
                        audioUrl={message.audioUrl}
                        speechSpeed={speechSpeed}
                        autoPlay={isLatestAiMessage && autoPlayAudio}
                    />
                )}

                {/* Toggle Action Buttons */}
                <div className="mt-3 flex items-center gap-2 pt-2">
                    {message.contentTranslation && (
                        <Button
                            size="small"
                            variant={showTranslation ? "contained" : "outlined"}
                            onClick={() => setShowTranslation((prev) => !prev)}
                            startIcon={
                                <TranslateRoundedIcon sx={{ fontSize: 15 }} />
                            }
                            sx={{
                                textTransform: "none",
                                fontSize: "11px",
                                py: 0.4,
                                px: 1.2,
                                borderRadius: "8px",
                            }}
                        >
                            {t("translationHeader")}
                        </Button>
                    )}

                    {message.grammarNote && (
                        <Button
                            size="small"
                            variant={showGrammar ? "contained" : "outlined"}
                            onClick={() => setShowGrammar((prev) => !prev)}
                            startIcon={
                                <MenuBookRoundedIcon sx={{ fontSize: 15 }} />
                            }
                            sx={{
                                textTransform: "none",
                                fontSize: "11px",
                                py: 0.4,
                                px: 1.2,
                                borderRadius: "8px",
                            }}
                        >
                            {t("grammar")}
                        </Button>
                    )}
                </div>

                {/* Collapses Container with Spacing */}
                {(message.contentTranslation || message.grammarNote) && (
                    <div className="mt-2 space-y-2">
                        <Collapse
                            in={showTranslation}
                            className="w-fit max-w-[80%]"
                        >
                            <div className="border-bdc-primary bg-bgc-secondary/90 text-text-contrast mt-1.5 w-fit rounded-xl border p-2.5 text-left text-xs shadow-xs">
                                <span className="mb-0.5 block font-semibold text-amber-600 dark:text-amber-400">
                                    {t("translationHeader")}:
                                </span>
                                <p className="font-medium">
                                    {message.contentTranslation}
                                </p>
                            </div>
                        </Collapse>

                        <Collapse
                            in={showGrammar}
                            className="w-fit max-w-[80%]"
                        >
                            <div className="border-bdc-primary bg-bgc-secondary/90 text-text-contrast mt-1.5 w-fit rounded-xl border p-2.5 text-left text-xs shadow-xs">
                                <span className="mb-0.5 block font-semibold text-indigo-600 dark:text-indigo-400">
                                    {t("grammarHeader")}:
                                </span>
                                <p className="font-medium">
                                    {message.grammarNote}
                                </p>
                            </div>
                        </Collapse>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageItemComponent;
