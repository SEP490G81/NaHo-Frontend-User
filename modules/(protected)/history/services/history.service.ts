import { apiFetch, hasApiConfigured } from "@/lib/apiClient";
import { mockHistoryList, type QuestionHistoryEntry } from "@/data/mockHistory";

// Lưu trữ danh sách lịch sử in-memory để giữ lại bài thi mới thu âm khi chạy ở chế độ offline/fallback
let fallbackHistoryList: QuestionHistoryEntry[] = [...mockHistoryList];

export async function getHistoryList(): Promise<QuestionHistoryEntry[]> {
  if (!hasApiConfigured()) {
    return fallbackHistoryList;
  }
  try {
    return await apiFetch<QuestionHistoryEntry[]>("/api/v1/history");
  } catch (error) {
    console.warn("getHistoryList API failed, falling back to mock data:", error);
    return fallbackHistoryList;
  }
}

export async function getHistoryById(historyId: string): Promise<QuestionHistoryEntry> {
  if (!hasApiConfigured()) {
    const entry = fallbackHistoryList.find((h) => h.historyId === historyId);
    if (!entry) throw new Error("History entry not found");
    return entry;
  }
  try {
    return await apiFetch<QuestionHistoryEntry>(`/api/v1/history/${historyId}`);
  } catch (error) {
    console.warn(`getHistoryById API failed for historyId ${historyId}, falling back to mock data:`, error);
    const entry = fallbackHistoryList.find((h) => h.historyId === historyId);
    if (!entry) throw new Error("History entry not found");
    return entry;
  }
}

export interface PracticeSubmission {
  topicId: string;
  questionId: string;
  audioBlob: Blob;
  durationSec: number;
}

export interface PracticeResult {
  historyId: string;
  score: number;
}

export async function submitPractice(submission: PracticeSubmission): Promise<PracticeResult> {
  if (!hasApiConfigured()) {
    // Giả lập lưu trữ bài làm khi ở chế độ fallback
    const newId = `h-${Date.now()}`;
    const score = Math.round((6.0 + Math.random() * 3.5) * 10) / 10;
    const newEntry: QuestionHistoryEntry = {
      historyId: newId,
      topicId: submission.topicId,
      questionId: submission.questionId,
      practicedAt: new Date().toISOString(),
      durationSec: submission.durationSec,
      score,
    };
    fallbackHistoryList = [newEntry, ...fallbackHistoryList];
    return {
      historyId: newId,
      score,
    };
  }

  try {
    const formData = new FormData();
    formData.append("topicId", submission.topicId);
    formData.append("questionId", submission.questionId);
    formData.append("audio", submission.audioBlob, "recording.webm");
    formData.append("durationSec", submission.durationSec.toString());

    return await apiFetch<PracticeResult>("/api/v1/analysis", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.warn("submitPractice API failed, falling back to local simulation:", error);
    const newId = `h-${Date.now()}`;
    const score = Math.round((6.0 + Math.random() * 3.5) * 10) / 10;
    const newEntry: QuestionHistoryEntry = {
      historyId: newId,
      topicId: submission.topicId,
      questionId: submission.questionId,
      practicedAt: new Date().toISOString(),
      durationSec: submission.durationSec,
      score,
    };
    fallbackHistoryList = [newEntry, ...fallbackHistoryList];
    return {
      historyId: newId,
      score,
    };
  }
}
