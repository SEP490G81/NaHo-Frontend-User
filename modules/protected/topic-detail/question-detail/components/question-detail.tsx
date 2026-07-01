"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { mockTopics } from "@/data/mockTopics";
import { getTopicById } from "@/modules/protected/topics/services/topic.service";
import { getQuestionHints } from "@/data/mockHints";
import { useHistoryStore } from "@/store/historyStore";
import QuestionCardView from "./question-card-view";
import ModelAnswerView from "./model-answer-view";
import HintsView from "./hints-view";
import CommentSection from "@/modules/protected/comment-reaction/features/comment-section";

export function QuestionDetail() {
    const params = useParams();
    const rawTopicId = params?.topicId as string;
    const questionId = params?.questionId as string;

    const matchedTopic = mockTopics.find((t) => rawTopicId?.startsWith(t.id));
    const topicId = matchedTopic ? matchedTopic.id : rawTopicId || "";

    // Nạp chi tiết chủ đề bằng Query
    const { data: topic } = useQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicById(topicId),
        enabled: !!topicId,
    });

    const entries = useHistoryStore((s) => s.entries);
    const historyEntry = React.useMemo(() => {
        return entries.find((e) => e.topicId === topicId && e.questionId === questionId);
    }, [entries, topicId, questionId]);

    if (!topic) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <p className="text-text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    const question = topic.questions.find((q) => q.id === questionId);

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

    const hints = getQuestionHints(topicId, questionId);

    return (
        <div className="px-4 py-6 md:px-8 space-y-6">

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Content (2/3) */}
                    <div className="space-y-6 lg:col-span-2">
                        <QuestionCardView
                            questionId={question.id}
                            jp={question.jp}
                            furigana={question.furigana}
                            vi={question.vi}
                            historyEntry={historyEntry}
                        />

                        <ModelAnswerView modelAnswer={question.modelAnswer} />

                        <HintsView hints={hints} />
                    </div>

                    {/* Right Sidebar (1/3) */}
                    <div className="lg:col-span-1">
                        <CommentSection questionId={question.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetail;

