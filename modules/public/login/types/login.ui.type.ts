import { FormTextField } from "@/types/ui/ui.type";

export type DotPosition = {
    id: string;
    x: number;
    y: number;
    size: number;
};

export interface LoginState {
    usernameOrEmail: FormTextField;
    rawPassword: FormTextField;
}
