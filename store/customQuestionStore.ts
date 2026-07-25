import { create } from "zustand";

export interface CustomQuestion {
    id: string;
    questionJp: string;
    hintVi?: string;
    shareToCommunity: boolean;
}

interface CustomQuestionState {
    current: CustomQuestion | null;
    setQuestion: (q: CustomQuestion) => void;
    reset: () => void;
}

export const useCustomQuestionStore = create<CustomQuestionState>((set) => ({
    current: null,
    setQuestion: (q) => set({ current: q }),
    reset: () => set({ current: null }),
}));
