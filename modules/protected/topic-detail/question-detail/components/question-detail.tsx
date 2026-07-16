"use client";
import React from "react";
import { useParams } from "next/navigation";
import { findQuestionAnywhere } from "@/data/questionLookup";
import { getQuestionChain } from "@/data/marugoto";
import NotFoundView from "@/components/ui/not.found.view";
import BackButton from "@/components/ui/back.button";
import { getQuestionHints } from "@/data/mockHints";
import { useHistoryStore } from "@/store/historyStore";
import QuestionCardView from "./question-card-view";
import ModelAnswerView from "./model-answer-view";
import HintsView from "./hints-view";
import CommentSection from "@/modules/protected/comment-reaction/features/comment-section";

// TODO: câu hỏi Marugoto lấy từ BE (id số) chưa tra được ở đây vì BE chưa có
// endpoint chi tiết câu hỏi (GET /speaking-questions/{id}) kèm từ vựng/ngữ pháp.
// Khi team BE bổ sung, thay `findQuestionAnywhere` bằng service gọi endpoint đó.
export function QuestionDetail() {
    const params = useParams();
    const questionId = params?.questionId as string;
    const bookId = params?.bookId as string;
    const lessonId = params?.lessonId as string;

    const hit = findQuestionAnywhere(questionId);
    const topicId = hit?.topicId ?? "";
    const question = hit?.question;
    const backHref =
        bookId && lessonId ? `/books/${bookId}/${lessonId}` : "/books";

    const entries = useHistoryStore((s) => s.entries);
    const historyEntry = React.useMemo(() => {
        return entries.find(
            (e) => e.topicId === topicId && e.questionId === questionId,
        );
    }, [entries, topicId, questionId]);

    if (!question) return <NotFoundView />;

    const hints = getQuestionHints(topicId, questionId);
    const chain = getQuestionChain(questionId);
    const qIndex = chain
        ? chain.canDo.questions.findIndex((q) => q.id === questionId) + 1
        : 0;

    return (
        <div className="space-y-6 px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="border-bdc-primary bg-bgc-app flex flex-col gap-2.5 rounded-2xl border p-2.5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-3.5">
                    <BackButton
                        href={backHref}
                        label="Quay lại bài học"
                        className="hover:bg-hbgc-app border-transparent bg-transparent px-2.5 py-1.5 shadow-none hover:border-transparent hover:shadow-none"
                    />
                    {chain && (
                        <div className="flex min-w-0 flex-wrap items-center gap-2 px-1 sm:px-0">
                            <span className="text-text-muted truncate text-sm">
                                {chain.lesson.enTitle}
                            </span>
                            <span className="border-bdc-primary bg-bgc-page text-text-contrast shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold">
                                Can-do {chain.canDo.orderInLesson} · Câu {qIndex}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

                    <div className="lg:col-span-1">
                        <CommentSection questionId={question.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetail;
