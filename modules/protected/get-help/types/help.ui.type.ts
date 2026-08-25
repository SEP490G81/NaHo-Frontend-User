import { StaticRoute } from "@/i18n/type";

export interface HelpLink {
    label: string;
    href: StaticRoute;
}

export interface HelpCategory {
    // id giữ nguyên ở cả 3 ngôn ngữ để map icon và lọc câu hỏi
    id: string;
    title: string;
    description: string;
}

export interface HelpGuide {
    id: string;
    title: string;
    description: string;
    duration: string;
    steps: string[];
    action?: HelpLink;
}

export interface HelpFaqItem {
    id: string;
    categoryId: string;
    question: string;
    answer: string[];
    link?: HelpLink;
}

export interface HelpTroubleshootingItem {
    id: string;
    title: string;
    symptom: string;
    steps: string[];
}

export interface HelpBrowserGuide {
    id: string;
    name: string;
    steps: string[];
}

export interface HelpContent {
    hero: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        searchLabel: string;
        popularLabel: string;
        popularQueries: string[];
    };
    categories: {
        title: string;
        description: string;
        questionCount: string;
        all: string;
        items: HelpCategory[];
    };
    guides: {
        title: string;
        description: string;
        stepLabel: string;
        items: HelpGuide[];
    };
    faq: {
        title: string;
        description: string;
        emptyCategory: string;
        items: HelpFaqItem[];
    };
    troubleshooting: {
        title: string;
        description: string;
        symptomLabel: string;
        browserTitle: string;
        browserDescription: string;
        items: HelpTroubleshootingItem[];
        browsers: HelpBrowserGuide[];
    };
}

export type HelpResultKind = "guide" | "faq" | "troubleshooting";

export interface HelpSearchResult {
    kind: HelpResultKind;
    id: string;
    title: string;
    /** Đoạn văn ngắn hiển thị dưới tiêu đề trong danh sách kết quả. */
    excerpt: string;
    link?: HelpLink;
}
