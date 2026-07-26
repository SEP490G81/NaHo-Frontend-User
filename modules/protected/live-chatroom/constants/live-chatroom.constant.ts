import type { Companion } from "../types/live-chatroom.type";

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
    },
    {
        id: "yuki",
        name: "Yuki",
        role: "Người phỏng vấn tuyển dụng",
        description: "Nghiêm khắc, phỏng vấn chuẩn, hỏi các câu hành vi khó.",
        level: "N2 – N1",
        accent: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
        matchKeyword: "yuki",
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
export function resolveCompanions(
    personas: { id: number; name: string }[],
): Companion[] {
    const used = new Set<number>();

    const mapped = COMPANIONS.map((c) => {
        const match = personas.find(
            (p) =>
                !used.has(p.id) &&
                p.name?.toLowerCase().includes(c.matchKeyword),
        );
        if (match) used.add(match.id);
        return { ...c, personaId: match ? match.id : null };
    });

    const extras: Companion[] = personas
        .filter((p) => !used.has(p.id))
        .map((p, i) => ({
            id: `persona-${p.id}`,
            name: p.name,
            role: "AI Companion",
            description: "",
            level: "",
            accent: EXTRA_ACCENTS[i % EXTRA_ACCENTS.length],
            matchKeyword: "",
            personaId: p.id,
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
