import {FileResponse} from "@/types/responses/file.response";
import {Gender} from "@/types/enums/user.enum";

/** Thể lịch sự của hội thoại (khớp enum FormalityLevel bên BE). */
export type FormalityLevel = "INFORMAL" | "NEUTRAL" | "FORMAL";

/** Cấp độ Marugoto (khớp enum MarugotoLevel bên BE). */
export type MarugotoLevel =
    | "STARTER_A1"
    | "ELEMENTARY_1_A2"
    | "ELEMENTARY_2_A2"
    | "PRE_INTERMEDIATE_A2_B1"
    | "INTERMEDIATE_1_B1"
    | "INTERMEDIATE_2_B1";

export type PersonaStatus = "ACTIVE" | "UNACTIVE";

/** Style hội thoại gắn với persona (BE trả kèm trong /personas). */
export interface ConversationStyleResponse {
    id: number;
    description: string | null;
    prompt: string;
    formalityLevel: FormalityLevel;
    marugotoLevel: MarugotoLevel;
}

/** GET /personas — mỗi persona kèm style hội thoại (thể lịch sự + cấp độ). */
export interface PersonaResponse {
    id: number;
    name: string;
    prompt: string;
    avatarFile?: FileResponse | null;
    defaultMarugotoLevel?: MarugotoLevel;
    defaultFormalityLevel?: FormalityLevel;
    suggestedConversationStyle?: ConversationStyleResponse;
    status: PersonaStatus;
    voiceName: string;
    gender: Gender;
}
