import {
    HelpContent,
    HelpSearchResult,
} from "@/modules/protected/get-help/types/help.ui.type";

/**
 * Bỏ dấu và hạ chữ thường để người học gõ không dấu vẫn tìm được nội dung có dấu
 * (ví dụ "mic khong nhan" khớp với "micro không nhận").
 */
const normalizeText = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        // dải U+0300–U+036F là các dấu thanh tách ra sau khi normalize
        .replace(/[̀-ͯ]/g, "")
        .replace(/đ/g, "d")
        .trim();

interface HelpSearchEntry {
    result: HelpSearchResult;
    haystack: string;
}

/**
 * Gom hướng dẫn, FAQ và mục khắc phục sự cố về cùng một danh sách để tìm kiếm
 * một lần trên toàn bộ trung tâm trợ giúp.
 */
export const buildHelpSearchIndex = (
    content: HelpContent,
): HelpSearchEntry[] => {
    const guides: HelpSearchEntry[] = content.guides.items.map((guide) => ({
        result: {
            kind: "guide",
            id: guide.id,
            title: guide.title,
            excerpt: guide.description,
            link: guide.action,
        },
        haystack: normalizeText(
            [guide.title, guide.description, ...guide.steps].join(" "),
        ),
    }));

    const faqs: HelpSearchEntry[] = content.faq.items.map((item) => ({
        result: {
            kind: "faq",
            id: item.id,
            title: item.question,
            excerpt: item.answer[0] ?? "",
            link: item.link,
        },
        haystack: normalizeText([item.question, ...item.answer].join(" ")),
    }));

    const troubles: HelpSearchEntry[] = content.troubleshooting.items.map(
        (item) => ({
            result: {
                kind: "troubleshooting",
                id: item.id,
                title: item.title,
                excerpt: item.symptom,
            },
            haystack: normalizeText(
                [item.title, item.symptom, ...item.steps].join(" "),
            ),
        }),
    );

    return [...guides, ...faqs, ...troubles];
};

/**
 * Khớp theo từng từ khoá: mọi từ trong truy vấn đều phải xuất hiện thì mới tính
 * là kết quả, nhờ vậy gõ thêm từ sẽ thu hẹp danh sách thay vì mở rộng.
 */
export const searchHelp = (
    index: HelpSearchEntry[],
    query: string,
): HelpSearchResult[] => {
    const terms = normalizeText(query).split(/\s+/).filter(Boolean);

    if (terms.length === 0) return [];

    return index
        .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
        .map((entry) => entry.result);
};

export const countQuestionsByCategory = (
    content: HelpContent,
    categoryId: string,
) => content.faq.items.filter((item) => item.categoryId === categoryId).length;
