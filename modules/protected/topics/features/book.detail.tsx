"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
    getBookDetail,
    getTopicDetail,
    listTopicsByBook,
} from "@/services/client/book.service";
import { mapBook, mapBeLesson, mapBeTopic } from "@/data/marugoto/mapper";
import type { MarugotoBook } from "@/data/marugoto/types";
import NotFoundView from "@/components/ui/not.found.view";
import TopicRoadmap from "./topic.roadmap";

function LoadingState() {
    return (
        <div className="space-y-5">
            <div className="border-bdc-primary bg-bgc-page h-52 animate-pulse rounded-2xl border" />
            <div className="border-bdc-primary bg-bgc-page h-20 animate-pulse rounded-2xl border" />
            <div className="border-bdc-primary bg-bgc-page h-20 animate-pulse rounded-2xl border" />
        </div>
    );
}

export function BookDetail() {
    const params = useParams();
    const bookId = params?.bookId as string;

    const bookQ = useQuery({
        queryKey: ["book", bookId],
        queryFn: () => getBookDetail(bookId),
        enabled: !!bookId,
    });
    const topicsQ = useQuery({
        queryKey: ["topics", bookId],
        queryFn: () => listTopicsByBook(bookId),
        enabled: !!bookId,
    });

    // Chủ đề "đang học" hiện tại = chủ đề đầu tiên (chưa có dữ liệu tiến độ) → nạp
    // sẵn lesson của nó để mở sổ ra ngay.
    const topics = useMemo(() => topicsQ.data ?? [], [topicsQ.data]);
    const currentTopicId = topics[0]?.id;
    const currentTopicQ = useQuery({
        queryKey: ["topic", currentTopicId],
        queryFn: () => getTopicDetail(currentTopicId!),
        enabled: !!currentTopicId,
    });

    const book: MarugotoBook | null = useMemo(() => {
        if (!bookQ.data) return null;
        const mb = mapBook(bookQ.data);
        mb.topics = topics.map((tp) =>
            mapBeTopic(
                tp,
                tp.id === currentTopicId
                    ? (currentTopicQ.data?.lessons ?? []).map(mapBeLesson)
                    : [],
            ),
        );
        return mb;
    }, [bookQ.data, topics, currentTopicId, currentTopicQ.data]);

    // Chờ nạp xong lesson của chủ đề hiện tại rồi mới render, để accordion tự mở sổ.
    const loading =
        bookQ.isLoading ||
        topicsQ.isLoading ||
        (!!currentTopicId && currentTopicQ.isLoading);

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl">
                {bookQ.isError ? (
                    <NotFoundView />
                ) : book && !loading ? (
                    <TopicRoadmap book={book} />
                ) : (
                    <LoadingState />
                )}
            </div>
        </div>
    );
}

export default BookDetail;
