import type { CanDo, Vocab } from "@/data/marugoto/types";

/** Bộ chuẩn bị (từ vựng + ngữ pháp) cho một câu hỏi luyện nói. */
export interface QuestionPrep {
    vocab: Vocab[];
    grammar: string[];
}

/** Chia một mảng thành `parts` khối liền mạch, cân bằng độ dài. */
function splitEven<T>(arr: T[], parts: number): T[][] {
    const res: T[][] = Array.from({ length: Math.max(parts, 1) }, () => []);
    if (parts <= 0 || arr.length === 0) return res;
    const per = Math.ceil(arr.length / parts);
    arr.forEach((item, i) => {
        const bucket = Math.min(Math.floor(i / per), parts - 1);
        res[bucket].push(item);
    });
    return res;
}

/** Gom các dòng grammar thành nhóm (mẫu đánh số + các ví dụ theo sau nó). */
function grammarGroups(lines: string[]): string[][] {
    const groups: string[][] = [];
    for (const line of lines) {
        const startsPattern = /^\s*\d+\./.test(line);
        if (startsPattern || groups.length === 0) groups.push([line]);
        else groups[groups.length - 1].push(line);
    }
    return groups;
}

/**
 * Phân bổ từ vựng & ngữ pháp của Can-do cho từng câu hỏi để mỗi câu có phần
 * chuẩn bị riêng. Dữ liệu mock hiện gộp ở cấp Can-do nên chia đều theo thứ tự;
 * hợp nhất lại vẫn ra đúng toàn bộ vocab của Can-do (dùng cho nút xem tổng).
 */
export function splitCanDoByQuestion(cando: CanDo): QuestionPrep[] {
    const n = cando.questions.length;
    if (n === 0) return [];
    const vocabChunks = splitEven(cando.vocabulary, n);
    const groupChunks = splitEven(grammarGroups(cando.grammar), n);
    return cando.questions.map((_, i) => ({
        vocab: vocabChunks[i] ?? [],
        grammar: (groupChunks[i] ?? []).flat(),
    }));
}

export default splitCanDoByQuestion;
