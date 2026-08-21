"use client";

import React, { useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UserChatMessage } from "../types/live.chatroom.type";

interface UserMessageBubbleProps {
    message: UserChatMessage;
}

export function UserMessageBubble({
    message,
}: Readonly<UserMessageBubbleProps>) {
    const t = useTranslations("liveChatroom");
    const [showCorrection, setShowCorrection] = useState(false);

    return (
        <div className="flex flex-col items-end gap-1.5">
            <div className="max-w-[85%] space-y-1.5 sm:max-w-[75%]">
                <div className="bg-bgc-highlight space-y-2 rounded-2xl rounded-tr-sm p-3.5 text-white shadow-xs">
                    <div className="text-[15px] leading-relaxed">
                        {message.text}
                    </div>

                    {/* Pronunciation score */}
                    {message.pronunciationScore != null && (
                        <div className="flex items-center gap-1.5 border-t border-white/20 pt-1.5 text-xs text-white/90">
                            <Sparkles className="h-3 w-3" />
                            <span>
                                {t("pronunciationScore")}:{" "}
                                <b>
                                    {Math.round(message.pronunciationScore)}/100
                                </b>
                            </span>
                        </div>
                    )}
                </div>

                {/* Correction hint */}
                {message.correction && (
                    <div className="border-bdc-primary bg-bgc-app space-y-1.5 rounded-xl border p-2.5 text-xs shadow-xs">
                        <button
                            type="button"
                            onClick={() => setShowCorrection((v) => !v)}
                            className="flex w-full cursor-pointer items-center justify-between font-semibold text-amber-600 dark:text-amber-400"
                        >
                            <span className="inline-flex items-center gap-1">
                                <AlertCircle className="h-3.5 w-3.5" />
                                {t("correctionSuggestion")}
                            </span>
                            {showCorrection ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                            )}
                        </button>
                        {showCorrection && (
                            <div className="text-text-contrast border-bdc-primary/50 space-y-1 border-t pt-1.5">
                                <div>
                                    <span className="text-text-muted">
                                        {t("corrected")}:{" "}
                                    </span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        {message.correction.correctedText}
                                    </span>
                                </div>
                                <p className="text-text-muted text-[11px] leading-relaxed">
                                    {message.correction.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <span className="text-text-muted block text-right text-[10px]">
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}

export default UserMessageBubble;
