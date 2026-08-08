"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getBookDetail, getLessonDetail, getObjectiveDetail, getTopicDetail, listTopicsByBook } from "@/services/client/book.service";
import { mapBeLessonDetail, mapBeObjective, mapBook } from "@/data/marugoto/mapper";
import type { BookTopic, Lesson } from "@/data/marugoto/types";
import { useLearningFrontier } from "@/hooks/use.learning.frontier";
import { accessVerdict } from "@/modules/protected/topics/utils/unlock";
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
    // Danh sách chủ đề của quyển — để xác minh topic THUỘC quyển trong URL + mốc khóa.
    const bookTopicsQ = useQuery({
        queryKey: ["topics", bookId],
        queryFn: () => listTopicsByBook(bookId),
        enabled: !!bookId,
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
        bookTopicsQ.isLoading ||
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

    // Guard: chủ đề phải THUỘC quyển trong URL và đã mở khóa theo mốc tiến độ.
    // Chặn cả /books/6/topics/1 (topic không nằm trong quyển 6) lẫn topic chưa mở.
    const bookTopic = bookTopicsQ.data?.find(
        (tp) => String(tp.id) === topicId,
    );
    if (bookTopicsQ.isSuccess && frontier != null) {
        const verdict = bookTopic
            ? accessVerdict(
                  {
                      firstNodeOrder: bookTopic.firstNodeGlobalOrderIndex,
                      lastNodeOrder: bookTopic.lastNodeGlobalOrderIndex,
                  },
                  frontier,
              )
            : "denied";
        if (verdict === "denied") return <NotFoundView />;
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
