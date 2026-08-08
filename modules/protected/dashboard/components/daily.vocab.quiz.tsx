"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import QuizIcon from "@mui/icons-material/Quiz";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
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
    const [score, setScore] = useState<number>(0);

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
        if (optId === q.correctOptionId) {
            setScore((prev) => prev + 10);
        }
    };

    const handleNextQuestion = () => {
        fetchQuiz();
    };

    return (
        <ContainerBox className="border-bdc-primary border">
            {/* Header */}
            <div className="border-bdc-primary/60 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff99ac]/20 text-[#ff758f]">
                        <QuizIcon />
                    </div>
                    <div>
                        <h3 className="text-text-primary text-lg font-extrabold">
                            {t("vocabQuizTitle")}
                        </h3>
                        <p className="text-text-muted text-xs">
                            {t("vocabQuizSubtitle")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Chip
                        label={`🌸 ${score} điểm Sakura`}
                        size="small"
                        className="border border-[#ff99ac]/40 bg-[#ff99ac]/20 font-bold text-[#ff758f]"
                    />
                </div>
            </div>

            {/* Question Body */}
            {loading && !quiz ? (
                <div className="flex h-48 items-center justify-center">
                    <CircularProgress size={32} style={{ color: "#ff758f" }} />
                </div>
            ) : (
                <div className="mt-5 space-y-4">
                    <div className="bg-bgc-subtle border-bdc-primary/50 rounded-xl border p-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-[#ff758f]">
                                {q.japanese}
                            </span>
                            {q.reading && (
                                <span className="text-text-muted text-xs font-semibold">
                                    ({q.reading})
                                </span>
                            )}
                        </div>
                        <p className="text-text-primary mt-2 text-sm font-medium">
                            Hãy chọn ý nghĩa tiếng Việt chính xác của từ vựng
                            trên:
                        </p>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {q.options.map((opt) => {
                            let btnStyle =
                                "border-bdc-primary/70 bg-bgc-app text-text-primary hover:border-[#ff99ac] hover:bg-[#ff99ac]/10";
                            if (isAnswered) {
                                if (opt.id === q.correctOptionId) {
                                    btnStyle =
                                        "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold dark:text-emerald-400";
                                } else if (opt.id === selectedOptionId) {
                                    btnStyle =
                                        "border-rose-500 bg-rose-500/10 text-rose-600 font-bold dark:text-rose-400";
                                } else {
                                    btnStyle =
                                        "border-bdc-primary/40 bg-bgc-app text-text-muted opacity-50";
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
                        <div className="border-bdc-primary/40 mt-4 flex flex-col items-center justify-between gap-3 border-t pt-3 sm:flex-row">
                            <p
                                className={`text-xs font-semibold ${
                                    isCorrect
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
        </ContainerBox>
    );
}

export default DailyVocabQuiz;
