import {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";

export const DEFAULT_SPEED = 1.0;
export const MIN_SPEED = 0.75;
export const MAX_SPEED = 1.5;
export const SPEED_STEP = 0.05;

export const MARUGOTO_LEVEL_OPTIONS: {
    value: MarugotoLevel;
    label: string;
    levelCode: string;
    badgeColor: string;
}[] = [
    {
        value: "STARTER_A1",
        label: "Marugoto Nhập môn (A1)",
        levelCode: "A1",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    },
    {
        value: "ELEMENTARY_1_A2",
        label: "Marugoto Sơ cấp 1 (A2.1)",
        levelCode: "A2.1",
        badgeColor: "bg-sky-500/10 text-sky-600 border-sky-500/30",
    },
    {
        value: "ELEMENTARY_2_A2",
        label: "Marugoto Sơ cấp 2 (A2.2)",
        levelCode: "A2.2",
        badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    },
    {
        value: "PRE_INTERMEDIATE_A2_B1",
        label: "Marugoto Tiền trung cấp (A2/B1)",
        levelCode: "A2/B1",
        badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
    },
    {
        value: "INTERMEDIATE_1_B1",
        label: "Marugoto Trung cấp 1 (B1.1)",
        levelCode: "B1.1",
        badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    },
    {
        value: "INTERMEDIATE_2_B1",
        label: "Marugoto Trung cấp 2 (B1.2)",
        levelCode: "B1.2",
        badgeColor: "bg-pink-500/10 text-pink-600 border-pink-500/30",
    },
];

export const FORMALITY_LEVEL_OPTIONS: {
    value: FormalityLevel;
    label: string;
    description: string;
}[] = [
    {
        value: "INFORMAL",
        label: "Thân mật (Tameguchi)",
        description: "Thể thông thường / Suồng sã, thích hợp bạn bè",
    },
    {
        value: "NEUTRAL",
        label: "Lịch sự (Desu / Masu)",
        description: "Thể lịch sự tiêu chuẩn hàng ngày",
    },
    {
        value: "FORMAL",
        label: "Trang trọng (Keigo)",
        description: "Kính ngữ / Khiêm nhường ngữ trong công sở",
    },
];
