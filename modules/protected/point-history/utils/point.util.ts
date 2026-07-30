import type {PointTransactionType} from "@/types/responses/point.response";

/** Màu chủ đạo cho nhãn loại hoạt động, gom theo nhóm ý nghĩa (bám tone giao diện). */
const REWARD = "#c99a17"; // vàng · phần thưởng
const PENALTY = "var(--color-bgc-error)"; // đỏ · trừ điểm
const COMPLETION = "var(--color-bgc-highlight)"; // hồng · hoàn thành học

const TYPE_TINT: Record<PointTransactionType, string> = {
    LEARNING_PATH_NODE_COMPLETION: COMPLETION,
    CAN_DO_COMPLETION: COMPLETION,
    LESSON_COMPLETION: COMPLETION,
    TOPIC_COMPLETION: COMPLETION,
    BOOK_COMPLETION: COMPLETION,
    LEARNING_PATH_NODE_RETAKE: COMPLETION,
    DAILY_LOGIN_REWARD: REWARD,
    DAILY_MISSION_REWARD: REWARD,
    STREAK_BONUS: REWARD,
    ACHIEVEMENT_REWARD: REWARD,
    PENALTY,
};

/** Màu nhãn cho một loại hoạt động điểm. */
export function tintOf(type: PointTransactionType): string {
    return TYPE_TINT[type] ?? COMPLETION;
}

/** Định dạng thời gian giao dịch theo giờ · ngày (vi-VN). */
export function formatPointTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Danh sách loại hoạt động để dựng bộ lọc, đúng thứ tự hiển thị. */
export const POINT_TYPES: PointTransactionType[] = [
    "LEARNING_PATH_NODE_COMPLETION",
    "CAN_DO_COMPLETION",
    "LESSON_COMPLETION",
    "TOPIC_COMPLETION",
    "BOOK_COMPLETION",
    "LEARNING_PATH_NODE_RETAKE",
    "DAILY_LOGIN_REWARD",
    "DAILY_MISSION_REWARD",
    "STREAK_BONUS",
    "ACHIEVEMENT_REWARD",
    "PENALTY",
];
