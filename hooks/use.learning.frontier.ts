"use client";
import { useQuery } from "@tanstack/react-query";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import { getUserLearningProgress } from "@/modules/protected/leaderboard/services/leaderboard.service";

/**
 * Mốc tiến độ (global order index) của node xa nhất người dùng được phép học.
 *
 * BE trả `farthestAvailableNodeGlobalOrderIndex`, nhưng với tài khoản vừa tạo thì
 * mới chỉ gán `farthestAvailableNodeId` (node đầu giáo trình) còn index để trống,
 * nên phải tra thêm chi tiết node để lấy index. Mốc này dùng để khóa/mở node,
 * Can-do, bài học, chủ đề và sách.
 */
export function useLearningFrontier(): {
    frontier: number | null;
    isLoading: boolean;
} {
    const progressQ = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
    });

    const progress = progressQ.data;
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
        isLoading: progressQ.isLoading || (fallbackId > 0 && nodeQ.isLoading),
    };
}

export default useLearningFrontier;
