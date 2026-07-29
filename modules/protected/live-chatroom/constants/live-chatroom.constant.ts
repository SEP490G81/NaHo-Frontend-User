import type { Companion } from "../types/live-chatroom.type";
import type {
    FormalityLevel,
    MarugotoLevel,
    PersonaResponse,
} from "@/types/responses/persona.response";

/**
 * Style hội thoại — khớp enum FormalityLevel bên BE.
 * Thứ tự hiển thị: Thân mật (INFORMAL) → Lịch sự (NEUTRAL) → Kính ngữ (FORMAL).
 */
export interface ConversationStyle {
    formality: FormalityLevel;
    key: "informal" | "neutral" | "formal";
}

export const CONVERSATION_STYLES: ConversationStyle[] = [
    { formality: "INFORMAL", key: "informal" },
    { formality: "NEUTRAL", key: "neutral" },
    { formality: "FORMAL", key: "formal" },
];

export const DEFAULT_FORMALITY: FormalityLevel = "NEUTRAL";

export function styleKeyOf(
    formality: FormalityLevel | null | undefined,
): ConversationStyle["key"] {
    return (
        CONVERSATION_STYLES.find((s) => s.formality === formality)?.key ??
        "neutral"
    );
}

/** Nhãn cấp độ Marugoto để hiển thị badge trình độ. */
const MARUGOTO_LABEL: Record<MarugotoLevel, string> = {
    STARTER_A1: "A1 · Nhập môn",
    ELEMENTARY_1_A2: "A2.1 · Sơ cấp 1",
    ELEMENTARY_2_A2: "A2.2 · Sơ cấp 2",
    PRE_INTERMEDIATE_A2_B1: "A2/B1 · Tiền trung cấp",
    INTERMEDIATE_1_B1: "B1.1 · Trung cấp 1",
    INTERMEDIATE_2_B1: "B1.2 · Trung cấp 2",
};

export function marugotoLabel(
    level: MarugotoLevel | null | undefined,
): string {
    return level ? MARUGOTO_LABEL[level] : "";
}

/** Danh sách cấp độ Marugoto để dựng dropdown (đúng thứ tự). */
export const MARUGOTO_LEVELS = Object.keys(
    MARUGOTO_LABEL,
) as MarugotoLevel[];

export const DEFAULT_MARUGOTO: MarugotoLevel = "STARTER_A1";

export const COMPANIONS: Companion[] = [
    {
        id: "sakura",
        name: "Sakura",
        role: "Giảng viên tiếng Nhật",
        description:
            "Nhẹ nhàng, thân thiện, tập trung giao tiếp hàng ngày và sửa ngữ pháp.",
        level: "Tất cả",
        accent: "bg-bgc-highlight/15 text-bgc-highlight",
        matchKeyword: "sakura",
        defaultFormality: "NEUTRAL",
        defaultMarugotoLevel: "STARTER_A1",
    },
    {
        id: "kenji",
        name: "Kenji",
        role: "Kỹ sư phần mềm Senior",
        description:
            "Chuyên nghiệp, hội thoại kỹ thuật, mô phỏng họp văn phòng Nhật.",
        level: "N3 – N1",
        accent: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
        matchKeyword: "kenji",
        defaultFormality: "NEUTRAL",
        defaultMarugotoLevel: "PRE_INTERMEDIATE_A2_B1",
    },
    {
        id: "yuki",
        name: "Yuki",
        role: "Người phỏng vấn tuyển dụng",
        description: "Nghiêm khắc, phỏng vấn chuẩn, hỏi các câu hành vi khó.",
        level: "N2 – N1",
        accent: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
        matchKeyword: "yuki",
        defaultFormality: "FORMAL",
        defaultMarugotoLevel: "INTERMEDIATE_2_B1",
    },
    {
        id: "tanaka",
        name: "Tanaka",
        role: "Khách hàng Nhật Bản",
        description:
            "Keigo trang trọng, mô phỏng đàm phán và thảo luận kinh doanh.",
        level: "N1",
        accent: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
        matchKeyword: "tanaka",
        defaultFormality: "FORMAL",
        defaultMarugotoLevel: "INTERMEDIATE_2_B1",
    },
];

export function getCompanion(id: string): Companion {
    return COMPANIONS.find((c) => c.id === id) ?? COMPANIONS[0];
}

/**
 * Hybrid: giữ metadata UI đẹp ở FE, nhưng gắn personaId thật lấy từ GET /personas.
 * Khớp theo `matchKeyword` xuất hiện trong tên persona (không phân biệt hoa/thường).
 * Persona nào không khớp companion nào sẽ được thêm mới với metadata mặc định.
 */
export function resolveCompanions(personas: PersonaResponse[]): Companion[] {
    const used = new Set<number>();

    const mapped = COMPANIONS.map((c) => {
        const match = personas.find(
            (p) =>
                !used.has(p.id) &&
                p.name?.toLowerCase().includes(c.matchKeyword),
        );
        if (match) used.add(match.id);
        return {
            ...c,
            personaId: match ? match.id : null,
            // Ưu tiên thể lịch sự + cấp độ từ BE, thiếu thì mặc định companion.
            defaultFormality:
                match?.conversationStyle?.formalityLevel ??
                c.defaultFormality ??
                DEFAULT_FORMALITY,
            defaultMarugotoLevel:
                match?.conversationStyle?.marugotoLevel ??
                c.defaultMarugotoLevel ??
                DEFAULT_MARUGOTO,
        };
    });

    // Persona chưa khớp companion nào → dựng thẻ từ dữ liệu BE (mô tả + cấp độ).
    const extras: Companion[] = personas
        .filter((p) => !used.has(p.id))
        .map((p, i) => ({
            id: `persona-${p.id}`,
            name: p.name,
            role: "AI Companion",
            description: p.conversationStyle?.description ?? "",
            level: marugotoLabel(p.conversationStyle?.marugotoLevel),
            accent: EXTRA_ACCENTS[i % EXTRA_ACCENTS.length],
            matchKeyword: "",
            personaId: p.id,
            defaultFormality:
                p.conversationStyle?.formalityLevel ?? DEFAULT_FORMALITY,
            defaultMarugotoLevel:
                p.conversationStyle?.marugotoLevel ?? DEFAULT_MARUGOTO,
        }));

    return [...mapped, ...extras];
}

const EXTRA_ACCENTS = [
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    "bg-rose-500/15 text-rose-600 dark:text-rose-300",
    "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
];

/** Gợi ý câu trả lời tĩnh (helper UX, không phải dữ liệu từ BE). */
export const DEFAULT_SUGGESTIONS = [
    "はい、わかりました",
    "自己紹介をさせていただきます",
    "もう一度お願いします",
];
