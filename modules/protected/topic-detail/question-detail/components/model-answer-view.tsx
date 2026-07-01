"use client";
import React from "react";
import { Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ModelAnswer } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import MockAudioPlayer from "../../components/mock.audio.player";

interface ModelAnswerViewProps {
    modelAnswer?: ModelAnswer;
}

export function ModelAnswerView({ modelAnswer }: ModelAnswerViewProps) {
    const t = useTranslations("topicDetail");

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="text-bgc-highlight text-base font-bold flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                {t("modelAnswer")}
            </h3>

            {modelAnswer ? (
                <div className="space-y-4">
                    <MockAudioPlayer durationSec={modelAnswer.durationSec} />

                    <div className="border-bdc-primary bg-bgc-page space-y-3 rounded-lg border p-4">
                        <div className="text-text-contrast text-lg leading-relaxed font-medium">
                            <FuriganaText
                                text={modelAnswer.jp}
                                furigana={modelAnswer.furigana}
                                showFurigana={true}
                            />
                        </div>
                        <div className="border-bdc-primary border-t border-dashed pt-2">
                            <p className="text-text-muted text-[10px] font-bold tracking-wide uppercase">
                                {t("vietnameseTranslation")}
                            </p>
                            <p className="text-text-contrast mt-1 text-sm">
                                {modelAnswer.vi}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-text-muted text-sm">{t("noModelAnswer")}</p>
            )}
        </section>
    );
}

export default ModelAnswerView;
