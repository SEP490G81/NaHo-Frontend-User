export type MissionType =
    | "COMPLETE_SPEAKING_QUESTION_NODE"
    | "TALK_WITH_AI"
    | string;

export type MissionStatus = "COMPLETED" | "IN_PROGRESS" | "EARNED";

export interface DailyMissionResponse {
    id: number;
    title: string;
    description: string;
    point: number;
    missionType: MissionType;
}

export interface UserDailyMissionResponse {
    id: number;
    userId: number;
    dailyMission: DailyMissionResponse;
    status: MissionStatus;
    startedDate: string;
    completedDate: string | null;
    earnedDate: string | null;
}
