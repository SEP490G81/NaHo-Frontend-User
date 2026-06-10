export interface LeaderboardEntry {
    rank: number;
    name: string;
    initials: string;
    points: number;
    isCurrentUser?: boolean;
}

export interface DailyPractice {
    day: string;
    minutes: number;
}
