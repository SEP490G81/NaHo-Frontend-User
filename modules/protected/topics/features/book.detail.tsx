"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
    getBookDetail,
    getTopicDetail,
    listTopicsByBook,
} from "@/services/client/book.service";
import { mapBeLesson, mapBeTopic, mapBook } from "@/data/marugoto/mapper";
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

    // TẠM THỜI hiển thị toàn bộ giáo trình: nạp lesson cho MỌI chủ đề (không chỉ
    // chủ đề đầu) để mọi Can-do đều lấy được.
    const topics = useMemo(() => topicsQ.data ?? [], [topicsQ.data]);
    const topicDetailQs = useQueries({
        queries: topics.map((tp) => ({
            queryKey: ["topic", tp.id],
            queryFn: () => getTopicDetail(tp.id),
        })),
    });

    const book: MarugotoBook | null = useMemo(() => {
        if (!bookQ.data) return null;
        const mb = mapBook(bookQ.data);
        mb.topics = topics.map((tp, i) =>
            mapBeTopic(
                tp,
                (topicDetailQs[i]?.data?.lessons ?? []).map(mapBeLesson),
            ),
        );
        return mb;
    }, [bookQ.data, topics, topicDetailQs]);

    // Chờ nạp xong lesson của mọi chủ đề rồi mới render, để accordion tự mở sổ.
    const loading =
        bookQ.isLoading ||
        topicsQ.isLoading ||
        (topics.length > 0 && topicDetailQs.some((q) => q.isLoading));

    return (
        <>
            {bookQ.isError ? (
                <NotFoundView />
            ) : book && !loading ? (
                <TopicRoadmap book={book} />
            ) : (
                <LoadingState />
            )}
        </>
    );
}

export default BookDetail;
