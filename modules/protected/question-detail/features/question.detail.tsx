"use client";
import React from "react";
import { useParams } from "next/navigation";
import { BookOpen, Mic, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { mapBook } from "@/data/marugoto/mapper";
import {
    getBookDetail,
    getLearningPathNodeDetail,
} from "@/services/client/book.service";
import { getMySubscription } from "@/services/client/subscription.service";
import { useLearningFrontier } from "@/hooks/use.learning.frontier";
import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";
import SampleAnswerCard from "@/components/ui/sample.answer.card";
import NotFoundView from "@/components/ui/not.found.view";
import PreviewSection from "@/modules/protected/lesson-path/components/preview.section";
import NodeTermList from "@/modules/protected/lesson-path/components/node.term.list";
import QuestionComments from "./question.comments";
import QuestionDetailHeader from "../components/question.detail.header";

const DEFAULT_ACCENT = "var(--color-bgc-highlight)";

/** Trang chi tiết câu hỏi nói: đề bài, từ vựng/ngữ pháp, câu mẫu (TTS), thảo luận. */
export function QuestionDetail() {
    const t = useTranslations("marugoto.questionDetail");
    const params = useParams();
    const bookId = params?.bookId as string;
    const topicId = params?.topicId as string;
    const nodeId = params?.nodeId as string;
    const { showFurigana } = useFurigana();

    const nodeQ = useQuery({
        queryKey: ["learning-node", nodeId],
        queryFn: () => getLearningPathNodeDetail(nodeId),
        enabled: !!nodeId,
    });
    const bookQ = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => getBookDetail(bookId),
        enabled: !!bookId,
    });
    const planQ = useQuery({
        queryKey: ["my-subscription"],
        queryFn: getMySubscription,
        staleTime: 5 * 60 * 1000,
    });
    // Mốc tiến độ thật để chặn truy cập node bị khóa qua URL (giống luật khóa BE).
    const { frontier, isLoading: frontierLoading } = useLearningFrontier();

    const detail = nodeQ.data;
    const sq = detail?.speakingQuestion;
    const mappedBook = bookQ.data ? mapBook(bookQ.data) : null;
    const accent = mappedBook?.coverColor ?? DEFAULT_ACCENT;
    const sampleAnswerEnabled = planQ.data?.sampleAnswerEnabled ?? false;

    if (nodeQ.isLoading || frontierLoading || bookQ.isLoading) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-6">
                <div className="border-bdc-primary bg-bgc-page h-40 animate-pulse rounded-2xl border" />
            </div>
        );
    }
    if (nodeQ.isError || !detail) return <NotFoundView />;
    // Guard: chỉ chặn node VƯỢT mốc tiến độ (đang khóa) → 404. Việc topic có thuộc
    // quyển hay không đã được guard ở trang lộ trình (listTopicsByBook) lo.
    if (frontier != null && detail.globalOrderIndex > frontier) {
        return <NotFoundView />;
    }
    if (!sq) return <NotFoundView />;

    const practiceHref = `/sandbox/${sq.id}?node=${nodeId}&book=${bookId}&topic=${topicId}`;

    return (
        <div
            className="mx-auto max-w-5xl space-y-6 px-4 py-6"
            style={{ "--book-accent": accent } as React.CSSProperties}
        >
            <QuestionDetailHeader
                backHref={`/books/${bookId}/topics/${topicId}`}
                japanese={sq.japaneseName}
                japaneseMarkup={sq.japaneseNameMarkup}
                description={sq.description}
                descriptionMarkup={sq.descriptionMarkup}
                showFurigana={showFurigana}
                accent={accent}
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="space-y-6">
                    <SampleAnswerCard
                        japanese={sq.japaneseSampleAnswer}
                        japaneseMarkup={sq.japaneseSampleAnswerMarkup}
                        vietnamese={sq.vietnameseSampleAnswer}
                        showFurigana={showFurigana}
                        accent={accent}
                        locked={!sampleAnswerEnabled}
                    />

                    <Link
                        href={practiceHref as AllRoute}
                        className="text-text-pure flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90"
                        style={{ background: accent }}
                    >
                        <Mic className="h-4 w-4" />
                        {t("practiceNow")}
                    </Link>

                    <QuestionComments speakingQuestionId={sq.id} />
                </div>

                <aside className="space-y-4">
                    {sq.vocabularies.length > 0 && (
                        <PreviewSection
                            icon={<BookOpen className="h-4 w-4" />}
                            title={t("vocab")}
                        >
                            <NodeTermList items={sq.vocabularies} />
                        </PreviewSection>
                    )}
                    {sq.grammars.length > 0 && (
                        <PreviewSection
                            icon={<Sparkles className="h-4 w-4" />}
                            title={t("grammar")}
                        >
                            <NodeTermList items={sq.grammars} />
                        </PreviewSection>
                    )}
                </aside>
            </div>
        </div>
    );
}

export default QuestionDetail;
