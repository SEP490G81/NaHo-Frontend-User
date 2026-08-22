import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CURRENT_BOOK_ID } from "@/data/marugoto/books";

/** Điểm tối thiểu để một câu hỏi được tính là "đạt" (đồng bộ với BE). */
export const PASS_SCORE = 7.5;

interface MarugotoState {
    /** Chủ tài khoản của tiến độ cục bộ; đổi user → xóa sạch để không lẫn dữ liệu. */
    userId: string | null;
    activeBookId: string;
    /** Điểm cao nhất theo từng câu hỏi (questionId → score 0..10). */
    questionScores: Record<string, number>;
    /** Các node không-phải-câu-hỏi (vocab/test) đã hoàn thành. */
    completedNodes: string[];
    /** Tổng điểm tích lũy (L-Point) để hiển thị & xếp hạng. */
    lPoints: number;
    /** Ghi nhớ lựa chọn hiện furigana giữa các phiên. */
    showFurigana: boolean;
    /**
     * Vị trí thẻ đang xem + đã ghi âm đạt hết bộ từ vựng chưa, theo từng node
     * (key = PathNode.id). Đặt ở store (persist) thay vì state cục bộ của dialog
     * vì dialog có thể bị unmount/remount (VD: TopicRoadmapBody remount do
     * React Query gc cache khi đổi tab lâu) — state cục bộ sẽ mất, store thì không.
     */
    vocabDialogProgress: Record<
        string,
        { cardIndex: number; viewedAll: boolean }
    >;
    setShowFurigana: (v: boolean) => void;
    setActiveBook: (id: string) => void;
    setQuestionScore: (questionId: string, score: number) => void;
    markNodeDone: (nodeId: string) => void;
    setVocabDialogProgress: (
        nodeId: string,
        progress: { cardIndex: number; viewedAll: boolean },
    ) => void;
    /** Mở rương: đánh dấu hoàn thành + cộng L-Point (chỉ 1 lần). */
    claimChest: (nodeId: string, reward: number) => boolean;
    /** Gắn tiến độ cục bộ với 1 user; nếu khác chủ cũ thì xóa sạch trước. */
    scopeToUser: (userId: string) => void;
}

const EMPTY_PROGRESS = {
    questionScores: {} as Record<string, number>,
    completedNodes: [] as string[],
    lPoints: 0,
    vocabDialogProgress: {} as Record<
        string,
        { cardIndex: number; viewedAll: boolean }
    >,
};

export const useMarugotoStore = create<MarugotoState>()(
    persist(
        (set, get) => ({
            userId: null,
            activeBookId: CURRENT_BOOK_ID,
            questionScores: {},
            completedNodes: [],
            lPoints: 0,
            showFurigana: true,
            vocabDialogProgress: {},
            setShowFurigana: (v) => set({ showFurigana: v }),
            setVocabDialogProgress: (nodeId, progress) =>
                set((s) => ({
                    vocabDialogProgress: {
                        ...s.vocabDialogProgress,
                        [nodeId]: progress,
                    },
                })),
            setActiveBook: (id) => set({ activeBookId: id }),
            scopeToUser: (userId) => {
                if (get().userId === userId) return;
                set({ userId, ...EMPTY_PROGRESS });
            },
            setQuestionScore: (questionId, score) => {
                const prev = get().questionScores[questionId] ?? 0;
                if (score <= prev) return;
                const gained = score >= PASS_SCORE && prev < PASS_SCORE;
                set((s) => ({
                    questionScores: {
                        ...s.questionScores,
                        [questionId]: score,
                    },
                    lPoints: gained
                        ? s.lPoints + Math.round(score * 10)
                        : s.lPoints,
                }));
            },
            markNodeDone: (nodeId) =>
                set((s) =>
                    s.completedNodes.includes(nodeId)
                        ? s
                        : { completedNodes: [...s.completedNodes, nodeId] },
                ),
            claimChest: (nodeId, reward) => {
                if (get().completedNodes.includes(nodeId)) return false;
                set((s) => ({
                    completedNodes: [...s.completedNodes, nodeId],
                    lPoints: s.lPoints + reward,
                }));
                return true;
            },
        }),
        { name: "naho-marugoto-path-v5" },
    ),
);
