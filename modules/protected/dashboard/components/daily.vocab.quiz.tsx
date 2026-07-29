"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import QuizIcon from "@mui/icons-material/Quiz";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { ContainerBox } from "@/components/ui/container.box";

interface QuizQuestion {
    id: number;
    word: string;
    furigana: string;
    context: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        word: "遠慮なく",
        furigana: "えんりょなく",
        context: "Trong giao tiếp Kaiwa hàng ngày, cụm từ này mang ý nghĩa gì?",
        options: [
            "Đừng ngại ngần / Hãy tự nhiên",
            "Vui lòng chờ trong giây lát",
            "Xin lỗi vì đã làm phiền bạn",
            "Cảm ơn sự giúp đỡ nhiệt tình",
        ],
        correctIndex: 0,
        explanation: "「遠慮なく」 (Enryo naku) nghĩa là 'Không cần ngại ngần', thường dùng khi mời người khác dùng bữa hoặc nhận giúp đỡ.",
    },
    {
        id: 2,
        word: "いただきます",
        furigana: "Itadakimasu",
        context: "Câu nói nào bắt buộc dùng trước khi bắt đầu bữa ăn ở Nhật Bản?",
        options: [
            "ごちそうさまでした",
            "いただきます",
            "お邪魔します",
            "いってらっしゃい",
        ],
        correctIndex: 1,
        explanation: "「いただきます」 thể hiện lòng biết ơn chân thành đối với món ăn và người đã nấu bữa ăn.",
    },
    {
        id: 3,
        word: "相槌",
        furigana: "あいづち (Aizuchi)",
        context: "Khái niệm 「相槌」 cực kỳ quan trọng trong nghệ thuật giao tiếp Kaiwa là gì?",
        options: [
            "Nghi thức bắt tay lịch sự",
            "Các từ chêm/gật đầu (Vâng, Ra vậy, Đúng thế) thể hiện sự tập trung lắng nghe đối phương",
            "Cúi chào góc 45 độ chuẩn doanh nghiệp",
            "Lời chúc mừng sinh nhật",
        ],
        correctIndex: 1,
        explanation: "Aizuchi (相槌) là nét văn hóa gật đầu và chêm câu 'はい', 'そうですね' liên tục để khích lệ người nói.",
    },
    {
        id: 4,
        word: "お疲れ様です",
        furigana: "おつかれさまです",
        context: "Cụm từ 「お疲れ様です」 thường được sử dụng trong trường hợp nào?",
        options: [
            "Chào hỏi người lạ ngoài phố",
            "Cảm ơn và chào đồng nghiệp sau khi hoàn thành công việc",
            "Chúc ngủ ngon vào ban đêm",
            "Từ chối một lời mời",
        ],
        correctIndex: 1,
        explanation: "「お疲れ様です」 dùng để ghi nhận sự nỗ lực làm việc vất vả của đồng nghiệp và bạn học.",
    },
];

export function DailyVocabQuiz() {
    const t = useTranslations("dashboard");
    const [questionIdx, setQuestionIdx] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const q = QUIZ_QUESTIONS[questionIdx];
    const isAnswered = selectedIndex !== null;
    const isCorrect = selectedIndex === q.correctIndex;

    const handleSelectOption = (idx: number) => {
        if (isAnswered) return;
        setSelectedIndex(idx);
        if (idx === q.correctIndex) {
            setScore((prev) => prev + 10);
        }
    };

    const handleNextQuestion = () => {
        setSelectedIndex(null);
        setQuestionIdx((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    };

    return (
        <ContainerBox className="border border-bdc-primary shadow-sm transition-all hover:shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-bdc-primary/60">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff99ac]/20 text-[#ff758f]">
                        <QuizIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-text-primary">
                            {t("vocabQuizTitle")}
                        </h3>
                        <p className="text-xs text-text-muted">{t("vocabQuizSubtitle")}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Chip
                        label={`🌸 ${score} điểm Sakura`}
                        size="small"
                        className="bg-[#ff99ac]/20 text-[#ff758f] font-bold border border-[#ff99ac]/40"
                    />
                </div>
            </div>

            {/* Question Body */}
            <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-bgc-subtle p-4 border border-bdc-primary/50">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#ff758f]">{q.word}</span>
                        <span className="text-xs font-semibold text-text-muted">({q.furigana})</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-text-primary">{q.context}</p>
                </div>

                {/* Options list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, idx) => {
                        let btnStyle = "border-bdc-primary/70 bg-bgc-app text-text-primary hover:border-[#ff99ac] hover:bg-[#ff99ac]/10";
                        if (isAnswered) {
                            if (idx === q.correctIndex) {
                                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold dark:text-emerald-400";
                            } else if (idx === selectedIndex) {
                                btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 font-bold dark:text-rose-400";
                            } else {
                                btnStyle = "border-bdc-primary/40 bg-bgc-app text-text-muted opacity-50";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                disabled={isAnswered}
                                onClick={() => handleSelectOption(idx)}
                                className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                            >
                                <span>{opt}</span>
                                {isAnswered && idx === q.correctIndex && (
                                    <CheckCircleIcon className="text-emerald-500" fontSize="small" />
                                )}
                                {isAnswered && idx === selectedIndex && idx !== q.correctIndex && (
                                    <CancelIcon className="text-rose-500" fontSize="small" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback & Next Button */}
                {isAnswered && (
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-bdc-primary/40">
                        <p className={`text-xs font-semibold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {isCorrect ? t("correctAnswer") : t("wrongAnswer")} — {q.explanation}
                        </p>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleNextQuestion}
                            endIcon={<ArrowForwardIcon fontSize="small" />}
                            className="bg-[#ff758f] hover:bg-[#ff99ac] font-bold text-white shrink-0 rounded-lg px-4 py-2"
                        >
                            {t("nextQuestion")}
                        </Button>
                    </div>
                )}
            </div>
        </ContainerBox>
    );
}

export default DailyVocabQuiz;
