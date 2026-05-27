import { UserResponse } from "@/types/responses/user.response";

export interface LoginApiResponse {
    message: string;
    user: UserResponse | null;
}
