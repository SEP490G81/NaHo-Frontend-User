export interface ChatSessionMessageRequest {
    transcript: string;
}

export interface EndSessionRequest {
    topic?: string | null;
    speechMetadata?: string | null;
    asrConfidence?: string | null;
}
