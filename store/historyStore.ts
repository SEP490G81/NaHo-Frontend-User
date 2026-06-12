import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockHistoryList, type QuestionHistoryEntry } from "@/data/mockHistory";

interface HistoryState {
  entries: QuestionHistoryEntry[];
  addEntry: (entry: QuestionHistoryEntry) => void;
  hasEntry: (historyId: string) => boolean;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      entries: mockHistoryList,
      addEntry: (entry) =>
        set((state) => {
          if (state.entries.some((e) => e.historyId === entry.historyId)) return state;
          return { entries: [entry, ...state.entries] };
        }),
      hasEntry: (historyId) => get().entries.some((e) => e.historyId === historyId),
      clear: () => set({ entries: [] }),
    }),
    { name: "naho-history" },
  ),
);
