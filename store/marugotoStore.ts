import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CURRENT_BOOK_ID } from "@/data/marugoto/books";

/** Điểm tối thiểu để một câu hỏi được tính là "đạt" (đồng bộ với BE). */
export const PASS_SCORE = 7.5;

interface MarugotoState {
    activeBookId: string;
    /** Điểm cao nhất theo từng câu hỏi (questionId → score 0..10). */
    questionScores: Record<string, number>;
    /** Các node không-phải-câu-hỏi (vocab/test) đã hoàn thành. */
    completedNodes: string[];
    /** Tổng điểm tích lũy (L-Point) để hiển thị & xếp hạng. */
    lPoints: number;
    /** Ghi nhớ lựa chọn hiện furigana giữa các phiên. */
    showFurigana: boolean;
    setShowFurigana: (v: boolean) => void;
    setActiveBook: (id: string) => void;
    setQuestionScore: (questionId: string, score: number) => void;
    markNodeDone: (nodeId: string) => void;
    /** Mở rương: đánh dấu hoàn thành + cộng L-Point (chỉ 1 lần). */
    claimChest: (nodeId: string, reward: number) => boolean;
}

export const useMarugotoStore = create<MarugotoState>()(
    persist(
        (set, get) => ({
            activeBookId: CURRENT_BOOK_ID,
            questionScores: {},
            completedNodes: [],
            lPoints: 0,
            showFurigana: true,
            setShowFurigana: (v) => set({ showFurigana: v }),
            setActiveBook: (id) => set({ activeBookId: id }),
            setQuestionScore: (questionId, score) => {
                const prev = get().questionScores[questionId] ?? 0;
                if (score <= prev) return;
                const gained = score >= PASS_SCORE && prev < PASS_SCORE;
                set((s) => ({
                    questionScores: { ...s.questionScores, [questionId]: score },
                    lPoints: gained ? s.lPoints + Math.round(score * 10) : s.lPoints,
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
        { name: "naho-marugoto-path-v4" },
    ),
);
