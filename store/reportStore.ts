import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Report, ReportType } from "@/modules/protected/report/types/report";

interface ReportModalState {
  isOpen: boolean;
  type: ReportType;
  questionId: string | null;
  commentId: number | null;
}

interface ReportState {
  reports: Report[];
  modalState: ReportModalState;
  openModal: (
    type: ReportType,
    questionId?: string | null,
    commentId?: number | null
  ) => void;
  closeModal: () => void;
  submitReport: (
    reportData: Omit<Report, "id" | "userId" | "isResolved" | "createdAt">,
    userId: string
  ) => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      reports: [],
      modalState: {
        isOpen: false,
        type: "SYSTEM",
        questionId: null,
        commentId: null,
      },
      openModal: (type, questionId = null, commentId = null) =>
        set({
          modalState: {
            isOpen: true,
            type,
            questionId,
            commentId,
          },
        }),
      closeModal: () =>
        set((state) => ({
          modalState: {
            ...state.modalState,
            isOpen: false,
          },
        })),
      submitReport: (reportData, userId) =>
        set((state) => {
          const newReport: Report = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            userId,
            isResolved: false,
            createdAt: new Date().toISOString(),
            ...reportData,
          };
          return {
            reports: [...state.reports, newReport],
          };
        }),
    }),
    { name: "naho-reports" }
  )
);
