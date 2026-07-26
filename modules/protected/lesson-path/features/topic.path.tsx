"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
    getBookDetail,
    getLessonDetail,
    getObjectiveDetail,
    getTopicDetail,
} from "@/services/client/book.service";
import {
    mapBeLessonDetail,
    mapBeObjective,
    mapBook,
} from "@/data/marugoto/mapper";
import type { BookTopic, Lesson } from "@/data/marugoto/types";
import { useMarugotoStore } from "@/store/marugotoStore";
import { useLearningFrontier } from "@/hooks/use.learning.frontier";
import NotFoundView from "@/components/ui/not.found.view";
import { useTopicNodes } from "../hooks/use.cando.nodes";
import TopicPathHeader from "../components/topic.path.header";
import TopicRoadmapBody from "./topic.roadmap.body";

function LoadingState() {
    return (
        <div className="px-4 py-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-4">
                <div className="border-bdc-primary bg-bgc-page h-20 animate-pulse rounded-2xl border" />
                <div className="border-bdc-primary bg-bgc-page h-40 animate-pulse rounded-2xl border" />
                <div className="border-bdc-primary bg-bgc-page h-40 animate-pulse rounded-2xl border" />
            </div>
        </div>
    );
}

export function TopicPath() {
    const params = useParams();
    const bookId = params?.bookId as string;
    const topicId = params?.topicId as string;
    const showFurigana = useMarugotoStore((s) => s.showFurigana);
    const setShowFurigana = useMarugotoStore((s) => s.setShowFurigana);

    const bookQ = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => getBookDetail(bookId),
        enabled: !!bookId,
    });
    const topicQ = useQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicDetail(topicId),
        enabled: !!topicId,
    });

    const lessons = useMemo(() => topicQ.data?.lessons ?? [], [topicQ.data]);
    const lessonQs = useQueries({
        queries: lessons.map((l) => ({
            queryKey: ["lesson", String(l.id)],
            queryFn: () => getLessonDetail(String(l.id)),
        })),
    });

    // Gộp toàn bộ Can-do (objective) của mọi bài để nạp node theo lô.
    const objRefs = lessons.flatMap((_, li) =>
        (lessonQs[li]?.data?.objectives ?? []).map((o) => ({ o, li })),
    );
    const objQs = useQueries({
        queries: objRefs.map((r) => ({
            queryKey: ["objective", r.o.id],
            queryFn: () => getObjectiveDetail(r.o.id),
        })),
    });

    const book = useMemo(
        () => (bookQ.data ? mapBook(bookQ.data) : null),
        [bookQ.data],
    );
    const topic: BookTopic | null = useMemo(() => {
        if (!topicQ.data) return null;
        return {
            id: String(topicQ.data.id),
            code: `T${topicQ.data.orderIndex}`,
            order: topicQ.data.orderIndex,
            jpTitle: topicQ.data.japaneseName,
            furiganaMarkup: topicQ.data.japaneseNameMarkup,
            enTitle: "",
            lessons: [],
        };
    }, [topicQ.data]);

    const lessonModels = useMemo<Lesson[]>(() => {
        return lessons
            .map((l, li) => {
                const detail = lessonQs[li]?.data;
                if (!detail) return null;
                const canDos = detail.objectives.map((o, oi) => {
                    const gi = objRefs.findIndex((r) => r.o.id === o.id);
                    const nodes = objQs[gi]?.data?.learningPathNodes ?? [];
                    return mapBeObjective(o, oi + 1, nodes);
                });
                return mapBeLessonDetail(detail, canDos);
            })
            .filter((l): l is Lesson => l !== null);
    }, [lessons, lessonQs, objRefs, objQs]);

    const { frontier, isLoading: frontierLoading } = useLearningFrontier();
    const { groups, overallPercent, currentNodeId } = useTopicNodes(
        lessonModels,
        frontier,
    );

    const loading =
        frontierLoading ||
        bookQ.isLoading ||
        topicQ.isLoading ||
        (lessons.length > 0 && lessonQs.some((q) => q.isLoading)) ||
        (objRefs.length > 0 && objQs.some((q) => q.isLoading));

    if (bookQ.isError || topicQ.isError) return <NotFoundView />;
    if (!book || !topic || loading) return <LoadingState />;

    return (
        <div className="px-4 py-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-4">
                <TopicPathHeader
                    book={book}
                    topic={topic}
                    accent={book.coverColor ?? "var(--color-bgc-highlight)"}
                    overallPercent={overallPercent}
                    lessonCount={lessonModels.length}
                    showFurigana={showFurigana}
                    setShowFurigana={setShowFurigana}
                />
                <TopicRoadmapBody
                    groups={groups}
                    bookId={bookId}
                    topicId={topicId}
                    accent={book.coverColor ?? "var(--color-bgc-highlight)"}
                    showFurigana={showFurigana}
                    currentNodeId={currentNodeId}
                />
            </div>
        </div>
    );
}

export default TopicPath;
