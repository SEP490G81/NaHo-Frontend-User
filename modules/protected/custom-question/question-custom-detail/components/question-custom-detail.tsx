"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { mockCommunityQuestions } from "@/data/mockCommunityQuestions";
import { useHistoryStore } from "@/store/historyStore";
import { useCustomQuestionStore } from "@/store/customQuestionStore";
import CustomQuestionCardView from "./custom-question-card-view";
import CustomModelAnswerView from "./custom-model-answer-view";
import CustomHintsView from "./custom-hints-view";
import CommentSection from "@/modules/protected/comment-reaction/features/comment-section";

export function QuestionCustomDetail() {
    const params = useParams();
    const { push } = useRouter();
    const questionId = params?.questionId as string;

    const question = React.useMemo(() => {
        return mockCommunityQuestions.find((q) => q.id === questionId);
    }, [questionId]);

    const entries = useHistoryStore((s) => s.entries);
    const setQuestion = useCustomQuestionStore((s) => s.setQuestion);

    // Kiểm tra xem đã từng làm câu hỏi này chưa bằng cách so khớp nội dung tiếng Nhật của câu hỏi
    const historyEntry = React.useMemo(() => {
        if (!question) return null;
        return entries.find((e) => e.topicId === "custom" && e.customJp === question.jp);
    }, [entries, question]);

    if (!question) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-text-contrast text-2xl font-bold">
                    Không tìm thấy câu hỏi
                </h2>
                <p className="text-text-muted">Vui lòng quay lại và thử lại.</p>
            </div>
        );
    }

    const handlePractice = () => {
        const id = `cq-${Date.now()}`;
        setQuestion({
            id,
            questionJp: question.jp,
            hintVi: question.vi,
            shareToCommunity: false,
        });
        push(`/sandbox-custom/${id}`);
    };

    // Giả lập bài mẫu cho câu hỏi cộng đồng
    const mockModelAnswer = {
        jp: question.jp + "。詳しく教えていただけますか？",
        furigana: question.furigana + "。くわしくおしえていただけますか？",
        vi: question.vi + ". Bạn có thể giải thích chi tiết hơn cho tôi không?",
        durationSec: 8,
    };

    return (
        <div className="px-4 py-6 md:px-8 space-y-6">

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Content (2/3) */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Question Section */}
                        <CustomQuestionCardView
                            question={question}
                            handlePractice={handlePractice}
                            historyEntry={historyEntry}
                        />

                        {/* Model Answer Card */}
                        <CustomModelAnswerView mockModelAnswer={mockModelAnswer} />

                        {/* Suggestions / Hints Card */}
                        <CustomHintsView />
                    </div>

                    {/* Right Sidebar (1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <CommentSection questionId={question.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionCustomDetail;

