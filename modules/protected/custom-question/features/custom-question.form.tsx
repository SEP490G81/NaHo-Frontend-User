"use client";
import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useRouter } from "@/i18n/navigation";
import { useCustomQuestionStore } from "@/store/customQuestionStore";
import { useTranslations } from "next-intl";

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
    const [share, setShare] = useState(defaultShare);
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
            shareToCommunity: share,
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

                <div className="space-y-2">
                    <label
                        htmlFor="question-jp"
                        className="text-text-contrast text-sm font-medium"
                    >
                        {t("textareaLabel")}
                    </label>
                    <textarea
                        id="question-jp"
                        value={questionJp}
                        onChange={(e) => setQuestionJp(e.target.value)}
                        placeholder={t("textareaPlaceholder")}
                        className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight min-h-[140px] w-full resize-y rounded-lg border p-3 text-sm outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="hint-vi"
                        className="text-text-contrast text-sm font-medium"
                    >
                        {t("hintLabel")}
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                            id="hint-vi"
                            value={hintVi}
                            onChange={(e) => setHintVi(e.target.value)}
                            placeholder={t("hintPlaceholder")}
                            className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                        />
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleGenerate}
                            disabled={generating}
                            startIcon={
                                generating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="h-4 w-4" />
                                )
                            }
                            sx={{
                                textTransform: "none",
                                borderColor: "var(--color-bgc-highlight)",
                                color: "var(--color-bgc-highlight)",
                                fontWeight: "semibold",
                                "&:hover": {
                                    borderColor: "var(--color-bgc-highlight)",
                                    backgroundColor: "rgba(240, 74, 5, 0.08)",
                                },
                                "&.Mui-disabled": {
                                    color: "var(--color-text-muted)",
                                    borderColor: "var(--color-bdc-muted)",
                                },
                            }}
                        >
                            {t("aiSuggestBtn")}
                        </Button>
                    </div>
                </div>

                <label className="border-bdc-primary bg-bgc-page flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm">
                    <input
                        type="checkbox"
                        checked={share}
                        onChange={(e) => setShare(e.target.checked)}
                        className="border-bdc-primary text-bgc-highlight focus:ring-bgc-highlight mt-1 h-4 w-4 rounded"
                    />
                    <span className="text-text-contrast flex-1 leading-tight">
                        {t("shareLabel")}{" "}
                        <span className="text-text-muted block text-xs sm:inline">
                            {t("shareSubLabel")}
                        </span>
                    </span>
                </label>

                <div className="border-bdc-primary flex flex-col-reverse items-stretch gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        onClick={() => push("/dashboard")}
                        variant="text"
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text-muted)",
                            "&:hover": {
                                backgroundColor: "var(--color-hbgc-app)",
                                color: "var(--color-text-contrast)",
                            },
                        }}
                    >
                        {t("back")}
                    </Button>
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-pure)",
                            fontWeight: "bold",
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        {t("nextStep")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CustomQuestionForm;
