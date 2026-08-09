"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getBookDetail, getLessonDetail, getObjectiveDetail, getTopicDetail } from "@/services/client/book.service";
import { mapBeLessonDetail, mapBeObjective, mapBook } from "@/data/marugoto/mapper";
import type { BookTopic, Lesson } from "@/data/marugoto/types";
import { useLearningFrontier } from "@/hooks/use.learning.frontier";
import NotFoundView from "@/components/ui/not.found.view";
import { useTopicNodes } from "../hooks/use.cando.nodes";
import TopicPathHeader from "../components/topic.path.header";
import TopicRoadmapBody from "./topic.roadmap.body";
import RoadmapSideRail from "./roadmap.side.rail";

import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";

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
    const { showFurigana } = useFurigana();

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

    const allNodes = useMemo(
        () => groups.flatMap((g) => g.blocks).flatMap((b) => b.nodes),
        [groups],
    );
    const completedCount = useMemo(
        () => allNodes.filter((n) => n.status === "completed").length,
        [allNodes],
    );
    const totalCount = allNodes.length;

    if (bookQ.isError || topicQ.isError) return <NotFoundView />;
    if (!book || !topic || loading) return <LoadingState />;

    // Guard 1 — CROSS-BOOK: node của chủ đề phải nằm trong dải node của quyển
    // (getBookDetail trả dải đáng tin, vd book1 [1,87], book6 [460,558]). Nếu
    // ngoài dải ⇒ chủ đề thuộc quyển khác (vd /books/6/topics/1) → 404.
    if (
        book.firstNodeOrder != null &&
        book.lastNodeOrder != null &&
        allNodes.length > 0
    ) {
        const gois = allNodes.map((n) => n.globalOrderIndex);
        if (
            Math.min(...gois) < book.firstNodeOrder ||
            Math.max(...gois) > book.lastNodeOrder
        ) {
            return <NotFoundView />;
        }
    }

    // Guard 2 — LOCKED: mọi node của chủ đề đều khóa (chưa tới mốc tiến độ) → 404.
    if (
        frontier != null &&
        allNodes.length > 0 &&
        allNodes.every((n) => n.status === "locked")
    ) {
        return <NotFoundView />;
    }

    const accent = book.coverColor ?? "var(--color-bgc-highlight)";

    return (
        <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="flex min-w-0 flex-col gap-6">
                    <TopicPathHeader
                        book={book}
                        topic={topic}
                        accent={accent}
                        overallPercent={overallPercent}
                        lessonCount={lessonModels.length}
                        showFurigana={showFurigana}
                        completedCount={completedCount}
                        totalCount={totalCount}
                    />
                    <TopicRoadmapBody
                        groups={groups}
                        bookId={bookId}
                        topicId={topicId}
                        accent={accent}
                        showFurigana={showFurigana}
                        currentNodeId={currentNodeId}
                    />
                </div>
                <RoadmapSideRail accent={accent} />
            </div>
        </div>
    );
}

export default TopicPath;
