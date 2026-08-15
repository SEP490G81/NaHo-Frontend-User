"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useTranslations } from "next-intl";
import { useChatStore } from "@/store/chatStore";

export function AiAudioSetting() {
    const t = useTranslations("settings.general");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const setAutoPlayAudio = useChatStore((s) => s.setAutoPlayAudio);

    return (
        <div
            id="setting-ai-audio"
            data-setting-id="setting-ai-audio"
            className="border-bdc-primary/60 bg-bgc-app rounded-xl border p-6 transition-all duration-300"
        >
            <div className="mb-4">
                <h2 className="text-text-contrast flex items-center gap-2 text-base font-bold">
                    <Volume2 className="h-5 w-5 text-bgc-highlight" />
                    {t("aiAudioTitle")}
                </h2>
                <p className="text-text-muted text-xs">
                    {t("aiAudioDesc")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Auto Play Option */}
                <button
                    type="button"
                    onClick={() => setAutoPlayAudio(true)}
                    className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        autoPlayAudio
                            ? "border-text-highlight bg-pink-50/20 shadow-md dark:bg-pink-950/20"
                            : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                    }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-bgc-highlight/15 text-bgc-highlight rounded-lg p-2">
                                <Volume2 className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-text-contrast text-sm font-semibold">
                                    {t("aiAudioAutoPlay")}
                                </span>
                                <p className="text-text-muted mt-0.5 text-xs">
                                    {t("aiAudioAutoPlayDesc")}
                                </p>
                            </div>
                        </div>
                        {autoPlayAudio ? (
                            <CheckCircleRoundedIcon className="text-text-highlight text-xl shrink-0" />
                        ) : (
                            <RadioButtonUncheckedIcon className="text-text-muted text-xl shrink-0" />
                        )}
                    </div>
                </button>

                {/* Manual Play Option */}
                <button
                    type="button"
                    onClick={() => setAutoPlayAudio(false)}
                    className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        !autoPlayAudio
                            ? "border-text-highlight bg-pink-50/20 shadow-md dark:bg-pink-950/20"
                            : "border-bdc-primary hover:border-bdc-muted bg-bgc-modal"
                    }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-bgc-page text-text-muted rounded-lg p-2 border border-bdc-primary/50">
                                <VolumeX className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-text-contrast text-sm font-semibold">
                                    {t("aiAudioManual")}
                                </span>
                                <p className="text-text-muted mt-0.5 text-xs">
                                    {t("aiAudioManualDesc")}
                                </p>
                            </div>
                        </div>
                        {!autoPlayAudio ? (
                            <CheckCircleRoundedIcon className="text-text-highlight text-xl shrink-0" />
                        ) : (
                            <RadioButtonUncheckedIcon className="text-text-muted text-xl shrink-0" />
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
}

export default AiAudioSetting;
