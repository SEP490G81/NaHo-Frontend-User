"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { useCustomQuestionStore } from "@/store/customQuestionStore";
import { useTranslations } from "next-intl";
import CustomQuestionInputs from "./custom-question-inputs";
import CustomQuestionActions from "./custom-question-actions";

const MOCK_AI_JP =
    "プロジェクトの進捗状況について、お客様のご意見を伺ってもよろしいでしょうか？";

interface CustomQuestionFormProps {
    defaultShare?: boolean;
}

export function CustomQuestionForm({
    defaultShare = false,
}: CustomQuestionFormProps) {
    const { push } = useRouter();
    const t = useTranslations("customQuestion");
    const setQuestion = useCustomQuestionStore((s) => s.setQuestion);

    const [questionJp, setQuestionJp] = useState("");
    const [hintVi, setHintVi] = useState("");
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setQuestionJp(MOCK_AI_JP);
            setGenerating(false);
            toast.success(t("suggestSuccess"));
        }, 800);
    };

    const handleNext = () => {
        if (!questionJp.trim()) {
            toast.error(t("errorEmptyJp"));
            return;
        }
        const id = `cq-${Date.now()}`;
        setQuestion({
            id,
            questionJp: questionJp.trim(),
            hintVi: hintVi.trim() || undefined,
            shareToCommunity: false,
        });
        push(`/sandbox-custom/${id}`);
    };

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-md border p-6 shadow-sm">
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-text-contrast text-lg font-semibold">
                        {t("formTitle")}
                    </h2>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("formSubtitle")}
                    </p>
                </div>

                <CustomQuestionInputs
                    t={t}
                    questionJp={questionJp}
                    setQuestionJp={setQuestionJp}
                    hintVi={hintVi}
                    setHintVi={setHintVi}
                    generating={generating}
                    onGenerate={handleGenerate}
                />

                <CustomQuestionActions
                    t={t}
                    onBack={() => push("/dashboard")}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
}

export default CustomQuestionForm;
