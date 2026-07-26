/** GET /personas — BE trả các field tối giản (chưa có role/mô tả/level UI). */
export interface PersonaResponse {
    id: number;
    name: string;
    prompt: string;
    avatarFileId: number | null;
    suggestedConversationStyleId: number | null;
}
