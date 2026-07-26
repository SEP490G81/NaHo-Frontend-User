export const currentLearner = {
    name: "Nguyễn Minh Tuấn",
    streakDays: 5,
};

export interface DailyPractice {
    day: string;
    minutes: number;
}

export const dailyPractice: DailyPractice[] = [
    { day: "T2", minutes: 18 },
    { day: "T3", minutes: 25 },
    { day: "T4", minutes: 12 },
    { day: "T5", minutes: 32 },
    { day: "T6", minutes: 28 },
    { day: "T7", minutes: 45 },
    { day: "CN", minutes: 22 },
];

export const skillScores = {
    pronunciation: 78,
    vocabulary: 64,
    grammar: 70,
    naturalness: 60,
};

export interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    initials: string;
    isCurrentUser?: boolean;
}

export const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Bùi Quang Sáng", points: 2840, initials: "BS" },
    { rank: 2, name: "Trần Thị Thanh An", points: 2610, initials: "TA" },
    { rank: 3, name: "Vũ Hải Yến", points: 2375, initials: "VY" },
    {
        rank: 4,
        name: "Nguyễn Minh Tuấn",
        points: 2180,
        initials: "NT",
        isCurrentUser: true,
    },
    { rank: 5, name: "Trịnh Minh Châu", points: 2045, initials: "TC" },
    { rank: 6, name: "Phạm Thu Hà", points: 1890, initials: "PH" },
    { rank: 7, name: "Lê Quốc Hùng", points: 1720, initials: "LH" },
    { rank: 8, name: "Hoàng Thị Mai", points: 1505, initials: "HM" },
];
