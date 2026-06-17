import { apiFetch, hasApiConfigured } from "@/libs/apiClient";
import { mockTopics, type Topic } from "@/data/mockTopics";

export async function getTopics(): Promise<Topic[]> {
    if (!hasApiConfigured()) {
        return mockTopics;
    }
    try {
        return await apiFetch<Topic[]>("/api/v1/topics");
    } catch (error) {
        console.warn("getTopics API failed, falling back to mock data:", error);
        return mockTopics;
    }
}

export async function getTopicById(topicId: string): Promise<Topic> {
    if (!hasApiConfigured()) {
        const topic = mockTopics.find((t) => t.id === topicId);
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
        const topic = mockTopics.find((t) => t.id === topicId);
        if (!topic) throw new Error("Topic not found");
        return topic;
    }
}
