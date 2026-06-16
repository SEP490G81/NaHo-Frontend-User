"use client";
import React from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@mui/material";

interface CustomQuestionInputsProps {
    t: any;
    questionJp: string;
    setQuestionJp: (v: string) => void;
    hintVi: string;
    setHintVi: (v: string) => void;
    generating: boolean;
    onGenerate: () => void;
}

export function CustomQuestionInputs({
    t,
    questionJp,
    setQuestionJp,
    hintVi,
    setHintVi,
    generating,
    onGenerate,
}: CustomQuestionInputsProps) {
    return (
        <div className="space-y-6">
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
                        onClick={onGenerate}
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
        </div>
    );
}

export default CustomQuestionInputs;
