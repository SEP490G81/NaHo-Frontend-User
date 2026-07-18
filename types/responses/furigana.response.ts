export interface FuriganaResponse {
    originalText: string;
    tokens: FuriganaResponseFuriganaTokenResponse[];
    markupString: string;
}

export interface FuriganaResponseFuriganaTokenResponse {
    kanji: string;
    furigana: string;
}
