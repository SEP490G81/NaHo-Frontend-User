export interface LegalBlock {
    heading?: string;
    paragraphs?: string[];
    items?: string[];
}

export interface LegalSection extends LegalBlock {
    // id dùng làm anchor, giữ nguyên ở cả 3 ngôn ngữ để link không đổi
    id: string;
    heading: string;
    subsections?: LegalBlock[];
}

export interface LegalContact {
    heading: string;
    paragraphs: string[];
}

export interface LegalDocument {
    title: string;
    summary: string;
    intro: string[];
    sections: LegalSection[];
    contact: LegalContact;
}

export interface LegalTocItem {
    id: string;
    heading: string;
}

export type LegalDocumentKey = "terms" | "privacy";
