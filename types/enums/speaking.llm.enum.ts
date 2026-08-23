export type FormalityLevel = "INFORMAL" | "NEUTRAL" | "FORMAL";

export enum SpeakingSessionStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export type MarugotoLevel =
    | "STARTER_A1"
    | "ELEMENTARY_1_A2"
    | "ELEMENTARY_2_A2"
    | "PRE_INTERMEDIATE_A2_B1"
    | "INTERMEDIATE_1_B1"
    | "INTERMEDIATE_2_B1";

export enum MessageType {
    AUDIO = "AUDIO",
    TEXT = "TEXT",
}

