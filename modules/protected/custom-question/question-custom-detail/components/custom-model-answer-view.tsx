"use client";
import React from "react";
import { Volume2 } from "lucide-react";
import FuriganaText from "@/components/ui/furigana.text";
import MockAudioPlayer from "../../../topic-detail/components/mock.audio.player";
import { useTranslations } from "next-intl";

interface CustomModelAnswerViewProps {
    mockModelAnswer: {
        jp: string;
        furigana: string;
        vi: string;
        durationSec: number;
    };
}

export function CustomModelAnswerView({ mockModelAnswer }: CustomModelAnswerViewProps) {
    const t = useTranslations("communityLibrary");

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="text-bgc-highlight text-base font-bold flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                {t("recommendedModelAnswer")}
            </h3>

            <div className="space-y-4">
                <MockAudioPlayer durationSec={mockModelAnswer.durationSec} />

                <div className="border-bdc-primary bg-bgc-page space-y-3 rounded-lg border p-4">
                    <div className="text-text-contrast text-lg leading-relaxed font-medium">
                        <FuriganaText
                            text={mockModelAnswer.jp}
                            furigana={mockModelAnswer.furigana}
                            showFurigana={true}
                        />
                    </div>
                    <div className="border-bdc-primary border-t border-dashed pt-2">
                        <p className="text-text-muted text-[10px] font-bold tracking-wide uppercase">
                            {t("vietnameseTranslationModelAnswer")}
                        </p>
                        <p className="text-text-contrast mt-1 text-sm">
                            {mockModelAnswer.vi}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomModelAnswerView;
