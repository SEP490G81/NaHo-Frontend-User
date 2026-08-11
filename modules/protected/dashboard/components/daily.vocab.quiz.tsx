"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import QuizIcon from "@mui/icons-material/Quiz";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { ContainerBox } from "@/components/ui/container.box";
import { getRandomVocabQuiz } from "@/services/client/vocabulary.service";
import { VocabQuizItem } from "@/types/responses/vocabulary.response";

const FALLBACK_QUIZ: VocabQuizItem = {
    vocabularyId: 1,
    japanese: "遠慮なく",
    reading: "えんりょなく",
    options: [
        { id: "A", text: "Đừng ngại ngần / Hãy tự nhiên" },
        { id: "B", text: "Vui lòng chờ trong giây lát" },
        { id: "C", text: "Xin lỗi vì đã làm phiền bạn" },
        { id: "D", text: "Cảm ơn sự giúp đỡ nhiệt tình" },
    ],
    correctOptionId: "A",
};

export function DailyVocabQuiz({ className = "" }: { className?: string }) {
    const t = useTranslations("dashboard");
    const [quiz, setQuiz] = useState<VocabQuizItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
        null,
    );

    const fetchQuiz = useCallback(async () => {
        setLoading(true);
        setSelectedOptionId(null);
        try {
            const data = await getRandomVocabQuiz(1);
            if (data && data.length > 0) {
                setQuiz(data[0]);
            } else {
                setQuiz(FALLBACK_QUIZ);
            }
        } catch (error) {
            console.error("Lỗi khi tải quiz từ vựng ngẫu nhiên:", error);
            if (!quiz) {
                setQuiz(FALLBACK_QUIZ);
            }
        } finally {
            setLoading(false);
        }
    }, [quiz]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const q = quiz || FALLBACK_QUIZ;
    const isAnswered = selectedOptionId !== null;
    const isCorrect = selectedOptionId === q.correctOptionId;

    const handleSelectOption = (optId: string) => {
        if (isAnswered) return;
        setSelectedOptionId(optId);
    };

    const handleNextQuestion = () => {
        fetchQuiz();
    };

    return (
        <ContainerBox
            className={`border-bdc-primary from-bgc-card via-bgc-card relative flex h-full flex-col justify-between overflow-hidden border bg-gradient-to-br to-[#ff99ac]/10 p-5 ${className}`}
        >
            {/* Sakura ambient glow circles */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ff99ac]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#ff758f]/10 blur-2xl" />

            <div className="relative z-10 flex h-full flex-col justify-between space-y-3">
                {/* 1. Header */}
                <div className="border-bdc-primary/60 flex items-center gap-3 border-b pb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff99ac]/20 text-[#ff758f]">
                        <QuizIcon style={{ fontSize: 20 }} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-text-primary text-base leading-tight font-extrabold">
                            {t("vocabQuizTitle")}
                        </h3>
                        <p className="text-text-muted mt-0.5 text-[11px]">
                            {t("vocabQuizSubtitle")}
                        </p>
                    </div>
                </div>

                {/* 2. Question Body & Options */}
                {loading && !quiz ? (
                    <div className="my-auto flex h-48 items-center justify-center">
                        <CircularProgress
                            size={32}
                            style={{ color: "#ff758f" }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col justify-between space-y-3">
                        {/* Từ vựng câu hỏi */}
                        <div className="border-bdc-primary/50 bg-bgc-subtle/60 rounded-xl border p-3 backdrop-blur-sm">
                            <div className="flex flex-wrap items-baseline gap-2">
                                <span className="text-xl font-black text-[#ff758f]">
                                    {q.japanese}
                                </span>
                                {q.reading && (
                                    <span className="text-text-muted text-xs font-semibold">
                                        ({q.reading})
                                    </span>
                                )}
                            </div>
                            <p className="text-text-primary mt-1 text-xs leading-relaxed font-medium">
                                {t("selectCorrectMeaning")}
                            </p>
                        </div>

                        {/* Danh sách 4 lựa chọn */}
                        <div className="flex flex-col gap-2">
                            {q.options.map((opt) => {
                                let btnStyle =
                                    "border-bdc-primary/70 bg-bgc-app/80 backdrop-blur-sm text-text-primary hover:border-[#ff99ac] hover:bg-[#ff99ac]/15";
                                if (isAnswered) {
                                    if (opt.id === q.correctOptionId) {
                                        btnStyle =
                                            "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold dark:text-emerald-400";
                                    } else if (opt.id === selectedOptionId) {
                                        btnStyle =
                                            "border-rose-500 bg-rose-500/10 text-rose-600 font-bold dark:text-rose-400";
                                    } else {
                                        btnStyle =
                                            "border-bdc-primary/40 bg-bgc-app/40 text-text-muted opacity-40";
                                    }
                                }

                                return (
                                    <button
                                        key={opt.id}
                                        disabled={isAnswered || loading}
                                        onClick={() =>
                                            handleSelectOption(opt.id)
                                        }
                                        className={`flex items-start justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${btnStyle}`}
                                    >
                                        <span className="pr-2 leading-snug">
                                            <strong className="mr-1 font-bold">
                                                {opt.id}.
                                            </strong>
                                            {opt.text}
                                        </span>
                                        {isAnswered &&
                                            opt.id === q.correctOptionId && (
                                                <CheckCircleIcon
                                                    className="mt-0.5 shrink-0 text-emerald-500"
                                                    style={{ fontSize: 16 }}
                                                />
                                            )}
                                        {isAnswered &&
                                            opt.id === selectedOptionId &&
                                            opt.id !== q.correctOptionId && (
                                                <CancelIcon
                                                    className="mt-0.5 shrink-0 text-rose-500"
                                                    style={{ fontSize: 16 }}
                                                />
                                            )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. Slot Cố Định Tuyệt Đối Chiều Cao (h-11 = 44px) */}
                <div className="border-bdc-primary/40 mt-auto flex h-11 shrink-0 items-center justify-between gap-2 border-t pt-2">
                    {isAnswered ? (
                        <>
                            <p
                                className={`text-xs leading-none font-bold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                            >
                                {isCorrect
                                    ? t("correctAnswer")
                                    : t("wrongAnswer")}
                            </p>

                            <Button
                                variant="contained"
                                size="small"
                                disabled={loading}
                                onClick={handleNextQuestion}
                                endIcon={
                                    loading ? (
                                        <CircularProgress
                                            size={12}
                                            color="inherit"
                                        />
                                    ) : (
                                        <ArrowForwardIcon
                                            style={{ fontSize: 14 }}
                                        />
                                    )
                                }
                                className="h-7 min-h-0 shrink-0 rounded-lg bg-[#ff758f] px-2.5 py-1 text-[11px] leading-none font-bold text-white hover:bg-[#ff99ac]"
                            >
                                {t("nextQuestion")}
                            </Button>
                        </>
                    ) : (
                        <p className="text-text-muted text-[11px] leading-none font-medium italic">
                            {t("selectOptionToAnswer")}
                        </p>
                    )}
                </div>
            </div>
        </ContainerBox>
    );
}

export default DailyVocabQuiz;
