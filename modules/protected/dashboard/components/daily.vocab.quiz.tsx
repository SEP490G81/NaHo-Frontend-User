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

export function DailyVocabQuiz() {
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
        <ContainerBox className="relative overflow-hidden border border-bdc-primary bg-gradient-to-br from-bgc-card via-bgc-card to-[#ff99ac]/10 p-5 md:p-6">
            {/* Sakura ambient glow circles phủ toàn bộ ContainerBox */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ff99ac]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#ff758f]/10 blur-2xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
                {/* Header */}
                <div className="flex flex-col justify-between gap-3 border-b border-bdc-primary/60 pb-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff99ac]/20 text-[#ff758f]">
                            <QuizIcon />
                        </div>
                        <div>
                            <h3 className="text-lg font-extrabold text-text-primary">
                                {t("vocabQuizTitle")}
                            </h3>
                            <p className="text-xs text-text-muted">
                                {t("vocabQuizSubtitle")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question Body */}
                {loading && !quiz ? (
                    <div className="flex h-48 items-center justify-center">
                        <CircularProgress size={32} style={{ color: "#ff758f" }} />
                    </div>
                ) : (
                    <div className="mt-5 space-y-4">
                        {/* Khối hiển thị từ vựng với nền kính mờ/subtle lồng bên trong */}
                        <div className="rounded-xl border border-bdc-primary/50 bg-bgc-subtle/60 backdrop-blur-sm p-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#ff758f]">
                                    {q.japanese}
                                </span>
                                {q.reading && (
                                    <span className="text-xs font-semibold text-text-muted">
                                        ({q.reading})
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-sm font-medium text-text-primary">
                                Hãy chọn ý nghĩa tiếng Việt chính xác của từ vựng trên:
                            </p>
                        </div>

                        {/* Options list */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                                            "border-bdc-primary/40 bg-bgc-app/40 text-text-muted opacity-50";
                                    }
                                }

                                return (
                                    <button
                                        key={opt.id}
                                        disabled={isAnswered || loading}
                                        onClick={() => handleSelectOption(opt.id)}
                                        className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-medium transition-all sm:text-sm ${btnStyle}`}
                                    >
                                        <span>
                                            <strong className="mr-1.5 font-bold">
                                                {opt.id}.
                                            </strong>
                                            {opt.text}
                                        </span>
                                        {isAnswered &&
                                            opt.id === q.correctOptionId && (
                                                <CheckCircleIcon
                                                    className="text-emerald-500"
                                                    fontSize="small"
                                                />
                                            )}
                                        {isAnswered &&
                                            opt.id === selectedOptionId &&
                                            opt.id !== q.correctOptionId && (
                                                <CancelIcon
                                                    className="text-rose-500"
                                                    fontSize="small"
                                                />
                                            )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback & Next Button */}
                        {isAnswered && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-bdc-primary/40 pt-3 sm:flex-row">
                                <p
                                    className={`text-xs font-semibold ${isCorrect
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-rose-600 dark:text-rose-400"
                                        }`}
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
                                                size={16}
                                                color="inherit"
                                            />
                                        ) : (
                                            <ArrowForwardIcon fontSize="small" />
                                        )
                                    }
                                    className="shrink-0 rounded-lg bg-[#ff758f] px-4 py-2 font-bold text-white hover:bg-[#ff99ac]"
                                >
                                    {t("nextQuestion")}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ContainerBox>
    );
}

export default DailyVocabQuiz;
