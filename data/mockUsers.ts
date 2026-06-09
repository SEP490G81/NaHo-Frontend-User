export type UserRole = "learner" | "teacher";
export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";
export type UserStatus = "active" | "banned";

export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  streak: number;
  targetLevel: JlptLevel;
  status: UserStatus;
  totalPracticeMinutes: number;
  sessionsThisWeek: number;
  /** 7 booleans: Mon..Sun */
  streakLogs: boolean[];
  skills: {
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    naturalness: number;
  };
}

export const ROLE_LABEL: Record<UserRole, string> = {
  learner: "Học viên",
  teacher: "Giảng viên",
};

export const STATUS_LABEL: Record<UserStatus, string> = {
  active: "Hoạt động",
  banned: "Bị khóa",
};

export const mockUsers: MockUser[] = [
  {
    id: "u01",
    fullName: "Nguyễn Minh Tuấn",
    email: "tuannm.brse@fe.edu.vn",
    role: "learner",
    streak: 24,
    targetLevel: "N3",
    status: "active",
    totalPracticeMinutes: 1820,
    sessionsThisWeek: 6,
    streakLogs: [true, true, true, false, true, true, true],
    skills: { pronunciation: 78, vocabulary: 64, grammar: 70, naturalness: 60 },
  },
  {
    id: "u02",
    fullName: "Trần Thị Thanh An",
    email: "anttt.dev@gmail.com",
    role: "learner",
    streak: 47,
    targetLevel: "N4",
    status: "active",
    totalPracticeMinutes: 2640,
    sessionsThisWeek: 7,
    streakLogs: [true, true, true, true, true, true, true],
    skills: { pronunciation: 82, vocabulary: 75, grammar: 68, naturalness: 80 },
  },
  {
    id: "u03",
    fullName: "Lê Quốc Hùng",
    email: "hunglq.brse@fe.edu.vn",
    role: "learner",
    streak: 3,
    targetLevel: "N4",
    status: "active",
    totalPracticeMinutes: 410,
    sessionsThisWeek: 2,
    streakLogs: [false, false, true, false, true, true, false],
    skills: { pronunciation: 55, vocabulary: 48, grammar: 52, naturalness: 45 },
  },
  {
    id: "u04",
    fullName: "Phạm Thu Hà",
    email: "hapt.learner@gmail.com",
    role: "learner",
    streak: 12,
    targetLevel: "N5",
    status: "active",
    totalPracticeMinutes: 760,
    sessionsThisWeek: 4,
    streakLogs: [true, false, true, true, true, false, true],
    skills: { pronunciation: 60, vocabulary: 58, grammar: 55, naturalness: 50 },
  },
  {
    id: "u05",
    fullName: "Đặng Văn Khoa",
    email: "khoadv.brse@fe.edu.vn",
    role: "learner",
    streak: 0,
    targetLevel: "N2",
    status: "banned",
    totalPracticeMinutes: 980,
    sessionsThisWeek: 0,
    streakLogs: [false, false, false, false, false, false, false],
    skills: { pronunciation: 72, vocabulary: 70, grammar: 66, naturalness: 62 },
  },
  {
    id: "u06",
    fullName: "Vũ Hải Yến",
    email: "yenvh.brse@fe.edu.vn",
    role: "learner",
    streak: 8,
    targetLevel: "N3",
    status: "active",
    totalPracticeMinutes: 1240,
    sessionsThisWeek: 5,
    streakLogs: [true, true, false, true, true, true, false],
    skills: { pronunciation: 68, vocabulary: 72, grammar: 65, naturalness: 70 },
  },
  {
    id: "u07",
    fullName: "Bùi Quang Sáng",
    email: "sangbq.dev@gmail.com",
    role: "learner",
    streak: 31,
    targetLevel: "N1",
    status: "active",
    totalPracticeMinutes: 3210,
    sessionsThisWeek: 7,
    streakLogs: [true, true, true, true, true, true, true],
    skills: { pronunciation: 88, vocabulary: 90, grammar: 85, naturalness: 86 },
  },
  {
    id: "u08",
    fullName: "Hoàng Thị Mai",
    email: "maihtt.learner@gmail.com",
    role: "learner",
    streak: 2,
    targetLevel: "N5",
    status: "banned",
    totalPracticeMinutes: 220,
    sessionsThisWeek: 0,
    streakLogs: [false, false, false, false, false, false, false],
    skills: { pronunciation: 40, vocabulary: 38, grammar: 35, naturalness: 32 },
  },
  {
    id: "u09",
    fullName: "Cô Phạm Ngọc Hà",
    email: "hapn10@fe.edu.vn",
    role: "teacher",
    streak: 60,
    targetLevel: "N1",
    status: "active",
    totalPracticeMinutes: 5400,
    sessionsThisWeek: 10,
    streakLogs: [true, true, true, true, true, true, true],
    skills: { pronunciation: 95, vocabulary: 96, grammar: 94, naturalness: 95 },
  },
  {
    id: "u10",
    fullName: "Thầy Nguyễn Tấn Phát",
    email: "phatnt.lecturer@fe.edu.vn",
    role: "teacher",
    streak: 45,
    targetLevel: "N1",
    status: "active",
    totalPracticeMinutes: 4880,
    sessionsThisWeek: 9,
    streakLogs: [true, true, true, true, false, true, true],
    skills: { pronunciation: 92, vocabulary: 94, grammar: 93, naturalness: 91 },
  },
  {
    id: "u11",
    fullName: "Cô Lê Khánh Linh",
    email: "linhlk.lecturer@fe.edu.vn",
    role: "teacher",
    streak: 22,
    targetLevel: "N2",
    status: "active",
    totalPracticeMinutes: 3120,
    sessionsThisWeek: 6,
    streakLogs: [true, false, true, true, true, true, false],
    skills: { pronunciation: 90, vocabulary: 88, grammar: 92, naturalness: 89 },
  },
  {
    id: "u12",
    fullName: "Trịnh Minh Châu",
    email: "chautm.brse@fe.edu.vn",
    role: "learner",
    streak: 15,
    targetLevel: "N3",
    status: "active",
    totalPracticeMinutes: 1450,
    sessionsThisWeek: 5,
    streakLogs: [true, true, true, false, true, true, false],
    skills: { pronunciation: 70, vocabulary: 66, grammar: 68, naturalness: 64 },
  },
];
