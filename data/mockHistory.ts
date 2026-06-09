export interface QuestionHistoryEntry {
  historyId: string;
  topicId: string;
  questionId: string;
  /** ISO date string */
  practicedAt: string;
  durationSec: number;
  /** Score 0–10 */
  score: number;
}

export const mockHistoryList: QuestionHistoryEntry[] = [
  {
    historyId: "h-001",
    topicId: "t-office-it",
    questionId: "q1",
    practicedAt: "2026-05-23T08:15:00.000Z",
    durationSec: 7,
    score: 8.5,
  },
  {
    historyId: "h-002",
    topicId: "t-office-it",
    questionId: "q2",
    practicedAt: "2026-05-22T14:02:00.000Z",
    durationSec: 11,
    score: 7.5,
  },
  {
    historyId: "h-003",
    topicId: "t-daily-life",
    questionId: "q1",
    practicedAt: "2026-05-21T19:30:00.000Z",
    durationSec: 9,
    score: 9.0,
  },
  {
    historyId: "h-004",
    topicId: "t-travel-japan",
    questionId: "q1",
    practicedAt: "2026-05-20T10:11:00.000Z",
    durationSec: 8,
    score: 6.8,
  },
  {
    historyId: "h-005",
    topicId: "t-brse-interview",
    questionId: "q1",
    practicedAt: "2026-05-19T16:45:00.000Z",
    durationSec: 12,
    score: 5.5,
  },
  {
    historyId: "h-006",
    topicId: "t-daily-standup",
    questionId: "q2",
    practicedAt: "2026-05-18T09:20:00.000Z",
    durationSec: 8,
    score: 8.2,
  },
];

/** Legacy lookup map for places that key by topic+question. */
export const mockQuestionHistory: Record<string, { historyId: string; score: number }> =
  Object.fromEntries(
    mockHistoryList.map((e) => [
      `${e.topicId}:${e.questionId}`,
      { historyId: e.historyId, score: e.score },
    ]),
  );

export function getQuestionHistory(topicId: string, questionId: string) {
  return mockQuestionHistory[`${topicId}:${questionId}`];
}
