"use client";
import { useQuery } from "@tanstack/react-query";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";

export function useLearningFrontier(): {
    frontier: number | null;
    isLoading: boolean;
} {
    const { progress, isLoading: isProgressLoading } = useUserLearningProgress();
    const knownIndex = progress?.farthestAvailableNodeGlobalOrderIndex ?? null;
    const fallbackId =
        knownIndex == null ? (progress?.farthestAvailableNodeId ?? 0) : 0;

    const nodeQ = useQuery({
        queryKey: ["learning-node", fallbackId],
        queryFn: () => getLearningPathNodeDetail(fallbackId),
        enabled: fallbackId > 0,
    });

    const frontier = knownIndex ?? nodeQ.data?.globalOrderIndex ?? null;
    return {
        frontier,
        isLoading: isProgressLoading || (fallbackId > 0 && nodeQ.isLoading),
    };
}

export default useLearningFrontier;
