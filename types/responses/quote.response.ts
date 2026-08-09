export interface QuoteItem {
    id: number;
    kanji: string;
    hiragana?: string | null;
    romaji: string;
    translation: string;
    kanjiDetail: string;
}
