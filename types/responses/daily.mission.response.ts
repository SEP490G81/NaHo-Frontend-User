export type MissionType =
    | "COMPLETE_SPEAKING_QUESTION_NODE"
    | "TALK_WITH_AI"
    | string;

export interface DailyMissionResponse {
    id: number;
    point: number;
    missionDate: string;
    missionType: MissionType;
}

export interface UserDailyMissionResponse {
    id: number;
    userId: number;
    dailyMissionId: number;
    completedAt: string;
}
