"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
    getBookDetail,
    getLessonDetail,
    getObjectiveDetail,
} from "@/services/client/book.service";
import {
    mapBeLessonDetail,
    mapBeObjective,
    mapBook,
} from "@/data/marugoto/mapper";
import type { Lesson, MarugotoBook } from "@/data/marugoto/types";
import { useMarugotoStore } from "@/store/marugotoStore";
import NotFoundView from "@/components/ui/not.found.view";
import { useLessonNodes } from "../hooks/use.cando.nodes";
import LessonPathHeader from "../components/lesson.path.header";
import LessonRoadmap from "./lesson.roadmap";

function LoadingState() {
    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[340px_1fr]">
                <div className="border-bdc-primary bg-bgc-page h-96 animate-pulse rounded-2xl border" />
                <div className="space-y-4">
                    <div className="border-bdc-primary bg-bgc-page h-24 animate-pulse rounded-2xl border" />
                    <div className="border-bdc-primary bg-bgc-page h-24 animate-pulse rounded-2xl border" />
                </div>
            </div>
        </div>
    );
}

function LessonPathContent({
    book,
    lesson,
}: {
    book: MarugotoBook;
    lesson: Lesson;
}) {
    const showFurigana = useMarugotoStore((s) => s.showFurigana);
    const setShowFurigana = useMarugotoStore((s) => s.setShowFurigana);
    const { blocks, overallPercent, currentNodeId } = useLessonNodes(lesson);
    const done = blocks.filter((b) => b.status === "completed").length;
    const accent = book.coverColor ?? "var(--color-bgc-highlight)";

    return (
        <div className="px-4 py-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
                <LessonPathHeader
                    book={book}
                    lesson={lesson}
                    accent={accent}
                    overallPercent={overallPercent}
                    candoDone={done}
                    candoTotal={blocks.length}
                    showFurigana={showFurigana}
                    setShowFurigana={setShowFurigana}
                />

                <LessonRoadmap
                    blocks={blocks}
                    accent={accent}
                    showFurigana={showFurigana}
                    currentNodeId={currentNodeId}
                />
            </div>
        </div>
    );
}

export function LessonPath() {
    const params = useParams();
    const bookId = params?.bookId as string;
    const lessonId = params?.lessonId as string;

    const bookQ = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => getBookDetail(bookId),
        enabled: !!bookId,
    });
    const lessonQ = useQuery({
        queryKey: ["lesson", lessonId],
        queryFn: () => getLessonDetail(lessonId),
        enabled: !!lessonId,
    });

    // Nạp node lộ trình cho từng Can-do (objective) của bài học.
    const objectives = lessonQ.data?.objectives ?? [];
    const objectiveQs = useQueries({
        queries: objectives.map((o) => ({
            queryKey: ["objective", o.id],
            queryFn: () => getObjectiveDetail(o.id),
        })),
    });

    const book = useMemo(
        () => (bookQ.data ? mapBook(bookQ.data) : null),
        [bookQ.data],
    );
    const lesson = useMemo<Lesson | null>(() => {
        if (!lessonQ.data) return null;
        const canDos = lessonQ.data.objectives.map((o, i) =>
            mapBeObjective(o, i + 1, objectiveQs[i]?.data?.learningPathNodes ?? []),
        );
        return mapBeLessonDetail(lessonQ.data, canDos);
    }, [lessonQ.data, objectiveQs]);

    // Chờ nạp xong node để lộ trình đầy đủ + tự mở Can-do đang học.
    const loading =
        bookQ.isLoading ||
        lessonQ.isLoading ||
        (objectives.length > 0 && objectiveQs.some((q) => q.isLoading));

    if (bookQ.isError || lessonQ.isError) return <NotFoundView />;
    if (!book || !lesson || loading) return <LoadingState />;

    return <LessonPathContent book={book} lesson={lesson} />;
}

export default LessonPath;
