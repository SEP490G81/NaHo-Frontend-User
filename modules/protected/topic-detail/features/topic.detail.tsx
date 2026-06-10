"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTopicById } from "@/modules/protected/topics/services/topic.service";
import { mockTopics } from "@/data/mockTopics";
import { getHistoryList } from "@/modules/protected/history/services/history.service";
import TopicMetadataCard from "../components/topic.metadata.card";
import QuestionList from "../components/question.list";

export function TopicDetail() {
    const t = useTranslations("page.topicDetail");
    const params = useParams();
    const rawTopicId = params?.topicId as string;
    const matchedTopic = mockTopics.find((t) => rawTopicId?.startsWith(t.id));
    const topicId = matchedTopic ? matchedTopic.id : rawTopicId || "";

    // Nạp chi tiết chủ đề bằng Query
    const { data: topic, isLoading: isTopicLoading } = useQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicById(topicId),
        enabled: !!topicId,
    });

    // Nạp lịch sử bài làm để tính toán những câu hỏi đã được làm
    const { data: history = [] } = useQuery({
        queryKey: ["history"],
        queryFn: getHistoryList,
    });

    const completed = React.useMemo(() => {
        return history
            .filter((entry) => entry.topicId === topicId)
            .map((entry) => entry.questionId);
    }, [history, topicId]);

    if (isTopicLoading) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <p className="text-text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-text-contrast text-2xl font-bold">
                    {t("notFoundTitle")}
                </h2>
                <p className="text-text-muted">{t("notFoundSubtitle")}</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[340px_1fr]">
                {/* Left metadata column */}
                <TopicMetadataCard topic={topic} />

                {/* Right questions list column */}
                <QuestionList topic={topic} completed={completed} />
            </div>
        </div>
    );
}

export default TopicDetail;
