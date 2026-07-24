import { apiFetch, hasApiConfigured } from "@/libs/apiClient";
import { mockTopics, type Topic } from "@/data/mockTopics";
import { getMarugotoTopicsAsTopics } from "@/data/marugoto";

/** Danh sách topic dùng chung: mock cũ + topic sinh từ sách Marugoto. */
function localTopics(): Topic[] {
    return [...mockTopics, ...getMarugotoTopicsAsTopics()];
}

export async function getTopicById(topicId: string): Promise<Topic> {
    if (!hasApiConfigured()) {
        const topic = localTopics().find((t) => t.id === topicId);
        if (!topic) throw new Error("Topic not found");
        return topic;
    }
    try {
        return await apiFetch<Topic>(`/api/v1/topics/${topicId}`);
    } catch (error) {
        console.warn(
            `getTopicById API failed for topicId ${topicId}, falling back to mock data:`,
            error,
        );
        const topic = localTopics().find((t) => t.id === topicId);
        if (!topic) throw new Error("Topic not found");
        return topic;
    }
}
