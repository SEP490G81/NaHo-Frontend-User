export type ReportType = "QUESTION" | "COMMENT" | "SYSTEM";

export interface Report {
  id: number;
  userId: string;
  questionId: string | null;
  commentId: number | null;
  title: string;
  description: string;
  reportType: ReportType;
  imageUrl?: string;
  isResolved: boolean;
  createdAt: string;
}
